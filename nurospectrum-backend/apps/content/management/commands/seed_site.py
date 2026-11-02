"""Load the starting content from the original website: posts, events, Library items, state communities.

Safe to run more than once: items that already exist are left untouched, so edits made in the
admin are never overwritten.
    python manage.py seed_site
"""
import json
from io import BytesIO
from pathlib import Path

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.common.constants import STATES
from apps.community.models import StateCommunity
from apps.content.models import Event, Post, Resource

SEED_FILE = Path(__file__).resolve().parents[2] / 'seed' / 'site_content.json'
SEED_COVER_COLORS = {
    'indigo': ((35, 38, 112), (116, 121, 218), (245, 196, 146)),
    'green': ((24, 91, 72), (99, 183, 142), (231, 207, 135)),
    'gold': ((116, 77, 12), (225, 176, 55), (246, 221, 159)),
    'rose': ((129, 43, 82), (211, 112, 155), (248, 199, 171)),
}


def _seed_cover_image(tone):
    from PIL import Image, ImageDraw

    dark, accent, light = SEED_COVER_COLORS[tone]
    image = Image.new('RGB', (1200, 675), dark)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((690, 70, 1130, 605), radius=220, fill=accent)
    draw.ellipse((795, 160, 1115, 480), fill=light)
    draw.ellipse((865, 230, 1045, 410), fill=dark)
    draw.rounded_rectangle((120, 115, 610, 160), radius=22, fill=light)
    draw.rounded_rectangle((120, 195, 500, 230), radius=17, fill=accent)
    draw.rounded_rectangle((120, 265, 560, 300), radius=17, fill=light)
    draw.line((120, 470, 340, 385, 490, 500, 680, 380), fill=accent, width=18)
    for x, y in ((120, 470), (340, 385), (490, 500), (680, 380)):
        draw.ellipse((x - 24, y - 24, x + 24, y + 24), fill=light)
    buffer = BytesIO()
    image.save(buffer, format='PNG', optimize=True)
    return ContentFile(buffer.getvalue())


class Command(BaseCommand):
    help = 'Seed posts, events, resources and the 37 state communities.'

    @transaction.atomic
    def handle(self, *args, **options):
        data = json.loads(SEED_FILE.read_text(encoding='utf-8'))

        for state in STATES:
            StateCommunity.objects.get_or_create(state=state)

        for item in data['posts']:
            slug = item.pop('slug')
            cover_path = item.pop('cover_image')
            post, _ = Post.objects.get_or_create(slug=slug, defaults={**item, 'published': True})
            if not post.cover_image or not post.cover_image.storage.exists(post.cover_image.name):
                post.cover_image.save(Path(cover_path).name, _seed_cover_image(post.tone), save=False)
                update_fields = ['cover_image']
                if not post.cover_alt:
                    post.cover_alt = item['cover_alt']
                    update_fields.append('cover_alt')
                post.save(update_fields=update_fields)

        for item in data['events']:
            Event.objects.get_or_create(date=item['date'], tone=item['tone'], defaults={**item, 'published': True})

        for item in data['resources']:
            Resource.objects.get_or_create(
                kind=item['kind'], title=item['title'], defaults={**item, 'published': True},
            )

        self.stdout.write(self.style.SUCCESS(
            f"Seeded {len(STATES)} communities, {len(data['posts'])} posts, "
            f"{len(data['events'])} events, {len(data['resources'])} resources."
        ))

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models

import apps.common.validators


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='cover_alt',
            field=models.CharField(blank=True, help_text='Describe the image for screen readers.', max_length=250),
        ),
        migrations.AddField(
            model_name='post',
            name='cover_image',
            field=models.ImageField(
                blank=True,
                help_text='Optional image shown on the blog card and at the top of the article. Max 5 MB.',
                upload_to='blog/covers/',
                validators=[
                    django.core.validators.FileExtensionValidator(
                        allowed_extensions=['jpg', 'jpeg', 'png', 'webp'],
                    ),
                    apps.common.validators.validate_image_size,
                ],
            ),
        ),
        migrations.CreateModel(
            name='PostImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(
                    upload_to='blog/inline/',
                    validators=[
                        django.core.validators.FileExtensionValidator(
                            allowed_extensions=['jpg', 'jpeg', 'png', 'webp'],
                        ),
                        apps.common.validators.validate_image_size,
                    ],
                )),
                ('alt_text', models.CharField(help_text='Describe the image for screen readers.', max_length=250)),
                ('caption', models.CharField(blank=True, max_length=300)),
                ('position', models.PositiveIntegerField(
                    default=1,
                    help_text='0 places the image before the first paragraph; 1 places it after paragraph 1, and so on.',
                )),
                ('order', models.PositiveIntegerField(
                    default=0,
                    help_text='Order for images at the same position.',
                )),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='content.post')),
            ],
            options={
                'ordering': ['position', 'order', 'id'],
            },
        ),
    ]

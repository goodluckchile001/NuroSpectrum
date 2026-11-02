# Shared constants. State names match the Next.js frontend (lib/content.ts) exactly.

STATES = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT Abuja',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
]
STATE_CHOICES = [(s, s) for s in STATES]

LANGUAGES = [('en', 'English'), ('ha', 'Hausa'), ('yo', 'Yorùbá'), ('ig', 'Igbo')]
LANGUAGE_CODES = [code for code, _ in LANGUAGES]

TONES = [('green', 'Green'), ('indigo', 'Indigo'), ('gold', 'Gold'), ('rose', 'Rose')]

ROLES = [
    ('neurodivergent', 'A neurodivergent person'),
    ('family', 'A parent, carer or family member'),
    ('professional', 'A teacher or professional'),
    ('ally', 'An ally'),
]

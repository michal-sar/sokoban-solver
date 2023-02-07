from django.db import models

# Create your models here.
class Level(models.Model):
    board = models.JSONField(null=False, unique=True)
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField

class Expense(models.Model):
	owner = models.ForeignKey(User, related_name='expenses')
	amount = MoneyField(max_digits=8, decimal_places=2, default_currency='USD')
	datetime = models.DateTimeField()
	description = models.TextField(default="")
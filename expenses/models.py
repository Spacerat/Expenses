from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField
from itertools import groupby
import datetime
from expenses.dategrouper import DateGrouper

class Expense(models.Model):
    owner = models.ForeignKey(User, related_name='expenses')
    amount = MoneyField(max_digits=8, decimal_places=2, default_currency='USD')
    datetime = models.DateTimeField()
    description = models.TextField(default="", blank=True)

    def __str__(self):
        return "<Expense: [{}] {} - {}>".format(self.datetime, self.owner.username, self.amount)

    @classmethod
    def getReport(cls, expenses, group_kind='week'):
        with_stats = ((e, DateGrouper.create(e.datetime, group_kind=group_kind)) for e in expenses)

        out = []

        for n, expensegroup in groupby(with_stats, lambda e: e[1].to_key()):
            l = list(expensegroup)
            total = sum(e.amount for e, _ in l)
            row = {
                'total': str(total),
                'count': len(l)
            }
            row.update(l[0][1].get_range())
            out.append(row)

        return {
            'grouped_by': group_kind,
            'rows': out
        }


    class Meta:
        ordering = ['datetime']

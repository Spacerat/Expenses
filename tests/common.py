from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from copy import copy

class BaseTestCase(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='tester', password='so_secret')
		self.admin = User.objects.create_user(username='admin', password='pass1234')
		self.list_url = reverse('expense-list')
		self.report_url = reverse('report')
		self.expense_id = 1

	def doLogin(self, admin=False):
		if admin:
			self.client.login(username='admin', password='pass1234')
		else:
			self.client.login(username='tester', password='so_secret')

	def make_expense(self, user, change=None, omit=None):
		expense = {
			'description': 'Blah', 
			'amount': '20.15',
			'datetime': '1999-10-10T15:13'
		}
		expected_expense = copy(expense)
		expected_expense.update({
			'owner': user.username,
			'display_amount': '$'+expense['amount'],
			'datetime': expense['datetime']+':00Z',
			'id': self.expense_id
		})
		if change: expense.update(change)
		if omit:
			for name in omit:
				del expense[name]
		self.expense_id += 1
		return expense, expected_expense


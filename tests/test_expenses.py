from rest_framework.test import APITestCase
from django.urls import reverse
from expenses.models import Expense
from django.contrib.auth.models import AnonymousUser, User
from copy import copy
class ExpenseAPITestCase(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='tester', password='so_secret')
		self.admin = User.objects.create_user(username='admin', password='pass1234')
		self.list_url = reverse('expense-list')
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

	def test_create_and_get_expense(self):
		""" Test that we can post a new expense """
		self.doLogin()
		args, expected_expense = self.make_expense(self.user)
		result = self.client.post(self.list_url, args)
		self.assertDictEqual(result.data, expected_expense)
		self.assertDictEqual(self.client.get(self.list_url).data[0], expected_expense)
		
	def test_create_expense_required_params(self):
		""" Test that an Expense cannot be created without all required parameters """
		self.doLogin()
		args, expected_expense = self.make_expense(self.user, omit=['description'])
		for key in args:
			result = self.client.post(self.list_url, {k: v for (k, v) in args.items() if k != key})
			self.assertEqual(result.data, {
				key: ["This field is required."]
			})

	def test_only_see_own_expenses(self):
		""" Check that one user can't see another user's expenses """
		self.doLogin(admin=True)
		args, expected_expense = self.make_expense(self.admin)
		self.client.post(self.list_url, args)
		self.assertDictEqual(self.client.get(self.list_url).data[0], expected_expense)
		self.client.logout()
		self.doLogin(admin=False)
		self.assertEqual(self.client.get(self.list_url).data, [])

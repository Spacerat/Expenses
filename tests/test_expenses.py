from rest_framework.test import APITestCase
from django.urls import reverse
from expenses.models import Expense
from django.contrib.auth.models import AnonymousUser, User

class ExpenseAPITestCase(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='tester', password='so_secret')

	def test_create_expense(self):
		""" Test that we can post a new expense """
		create_url = reverse('expense-list')
		args = {
			'description': 'Blah', 
			'amount': '20.15',
			'owner': self.user.id,
			'datetime': '1999-10-10T15:13'
		}
		result = self.client.post(create_url, args)
		args.update({
			'id': 1,
			'datetime': '1999-10-10T15:13:00Z', 
			'display_amount': '$20.15'
		})
		self.assertEqual(result.data, args)
		
	def test_create_expense_required_params(self):
		""" Test that an Expense cannot be created without all required parameters """
		create_url = reverse('expense-list')
		args = {
			'amount': '20.15',
			'owner': self.user.id,
			'datetime': '1999-10-10T15:13'
		}
		for key in args:
			result = self.client.post(create_url, {k: v for (k, v) in args.items() if k != key})
			self.assertEqual(result.data, {
				key: ["This field is required."]
			})


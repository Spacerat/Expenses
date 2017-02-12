from .common import BaseTestCase
from expenses.models import Expense


class ExpenseAPITestCase(BaseTestCase):
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

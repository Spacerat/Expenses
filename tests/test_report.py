from .common import BaseTestCase
from expenses.models import Expense
import json

class ReportAPITestCase(BaseTestCase):
	def setup_report(self, details, user=None):
		user = user if user else self.user
		objs = [Expense.objects.create(amount=amount, datetime=date+'T00:00:00Z', owner=user) for amount, date in details]
		for o in objs:
			o.save()

	def test_report(self):
		""" Test that we can see expenses grouped by weeks """
		self.doLogin()
		self.setup_report([(10, '1999-04-01'), (10, '1999-04-03'), (10, '1999-04-05')])
		response = self.client.get(self.report_url)
		expected = {
			"rows":[
				{"to":"1999-04-04T00:00:00Z","total":"$20.00","from":"1999-03-29T00:00:00Z","count": 2},
				{"to":"1999-04-11T00:00:00Z","total":"$10.00","from":"1999-04-05T00:00:00Z","count": 1}
				],
			"grouped_by":"week"
		}
		self.assertDictEqual(json.loads(response.content), expected)

from rest_framework import serializers
from expenses.models import Expense
from djmoney.contrib.django_rest_framework.fields import MoneyField

class ExpensesSerializer(serializers.ModelSerializer):
	description = serializers.CharField(required=False)
	display_amount = serializers.CharField(source='amount', read_only=True)
	amount = MoneyField(max_digits=8, decimal_places=2)
	class Meta:
		model = Expense
		fields = ('id', 'owner', 'amount', 'display_amount', 'datetime', 'description')

from rest_framework import serializers
from expenses.models import Expense
from django.contrib.auth.models import User
from djmoney.contrib.django_rest_framework.fields import MoneyField

class ExpenseSerializer(serializers.ModelSerializer):
	description = serializers.CharField(required=False)
	display_amount = serializers.CharField(source='amount', read_only=True)
	amount = MoneyField(max_digits=8, decimal_places=2)
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Expense
		fields = ('id', 'owner', 'amount', 'display_amount', 'datetime', 'description')


class UserSerializer(serializers.ModelSerializer):
	expenses = ExpenseSerializer(many=True)	
	class Meta:
		model = User
		fields = ('id', 'expenses')

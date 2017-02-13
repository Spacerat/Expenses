import { createAction } from 'redux-actions';
import { schema } from 'normalizr';
import { push } from 'react-router-redux'

function createApiAction(type, path, {schema=null, then=null} = {}) {
	return createAction('CALL_API', payload=>({
		path: path,
		result_type: type,
		args: payload,
		schema: schema,
		then: then
	}))
}

const expense = new schema.Entity('expenses');

export const fetchExpenses = createApiAction('EXPENSES_FETCH', 'expenses.expenses_list', {schema: [expense]})
export const fetchExpense = createApiAction('EXPENSE_FETCH', 'expenses.expenses_read', {schema: expense})
export const createExpense = createApiAction('EXPENSE_CREATE', 'expenses.expenses_create', {schema: expense})
export const updateExpense = createApiAction('EXPENSE_UPDATE', 'expenses.expenses_update', {schema: expense, then: push('/expenses')})
export const deleteExpense = createApiAction('EXPENSE_DELETE', 'expenses.expenses_delete', {then: push('/expenses')})

export const fetchReport = createApiAction('REPORT_FETCH', 'report.report_list')

export const fetchUsers = createApiAction('USERS_FETCH', 'users.users_list')

import { createAction } from 'redux-actions';
import { schema } from 'normalizr';

function createApiAction(type, path, schema=null) {
	return createAction('CALL_API', payload=>({
		path: path,
		result_type: type,
		args: payload,
		schema: schema
	}))
}

const expense = new schema.Entity('expenses');

export const fetchExpenses = createApiAction('EXPENSES_FETCH', 'expenses.expenses_list', [expense])
export const fetchExpense = createApiAction('EXPENSE_FETCH', 'expenses.expenses_read', expense)
export const fetchReport = createApiAction('REPORT_FETCH', 'report.report_list')

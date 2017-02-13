from __future__ import unicode_literals

from django.apps import AppConfig
from schema_export import export_schema

class ExpensesConfig(AppConfig):
    name = 'expenses'

    def ready(self):
        export_schema()
        from . import signals

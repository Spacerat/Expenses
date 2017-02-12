import datetime

class DateGrouper(object):
    """ Base class for Date Groupers: classes which help with grouping dates by ranges """
    def __init__(self, date):
        year, week, weekday = date.isocalendar()
        self.datetime = date
        self.week = week
        self.month = date.month
        self.year = date.year
        self.iso_year = year

    def get_range(self):
        inverted = self.invert()
        return {'from': inverted, 'to': self.get_upper_range(inverted) - datetime.timedelta(days=1)}

    @staticmethod
    def create(date, group_kind):
        groupers = {'week': WeekGrouper, 'month': MonthGrouper, 'year': YearGrouper}
        return groupers[group_kind](date)

class WeekGrouper(DateGrouper):
    def to_key(self):
        return (('week', self.week), ('year', self.iso_year))

    def invert(self):
        return iso_to_gregorian(self.iso_year, self.week, 1, tzinfo=self.datetime.tzinfo)

    def get_upper_range(self, inverted):
        return inverted + datetime.timedelta(weeks=1)


class MonthGrouper(DateGrouper):
    def to_key(self):
        return (('month', self.month), ('year', self.year))

    def invert(self):
        return datetime.datetime(self.year, self.month, 1, tzinfo=self.datetime.tzinfo)

    def get_upper_range(self, inverted):
        return inverted.replace(
            month = 1 if inverted.month == 12 else inverted.month,
            year = inverted.year+1 if inverted.month == 12 else inverted.year,
            )

class YearGrouper(DateGrouper):
    def to_key(self):
        return (('year', self.year),)

    def invert(self):
        return datetime.datetime(self.year, 1, 1, tzinfo=self.datetime.tzinfo)

    def get_upper_range(self, inverted):
        return inverted.replace(year=inverted.year+1)

# Following adapted from stackoverflow:
# http://stackoverflow.com/questions/304256/whats-the-best-way-to-find-the-inverse-of-datetime-isocalendar

def iso_year_start(iso_year, tzinfo=None):
    "The gregorian calendar date of the first day of the given ISO year"
    fourth_jan = datetime.datetime(iso_year, 1, 4, tzinfo=tzinfo)
    delta = datetime.timedelta(fourth_jan.isoweekday()-1)
    return (fourth_jan - delta )

def iso_to_gregorian(iso_year, iso_week, iso_day, tzinfo=None):
    "Gregorian calendar date for the given ISO year, week and day"
    year_start = iso_year_start(iso_year, tzinfo=tzinfo)
    return year_start + datetime.timedelta(days=iso_day-1, weeks=iso_week-1)

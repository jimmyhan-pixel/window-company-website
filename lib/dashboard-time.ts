const DEFAULT_TIME_ZONE = 'America/New_York'

function getTimeZoneOffset(timeZone: string, date: Date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'shortOffset',
        hour: '2-digit',
    })

    const timeZoneName = formatter
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName')?.value

    const offsetMatch = timeZoneName?.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/)

    if (!offsetMatch) {
        return '-05:00'
    }

    const rawHours = offsetMatch[1]
    const rawMinutes = offsetMatch[2] ?? '00'
    const sign = rawHours.startsWith('-') ? '-' : '+'
    const hours = rawHours.replace(/[+-]/, '').padStart(2, '0')

    return `${sign}${hours}:${rawMinutes}`
}

export function getStartOfTodayIso(timeZone = DEFAULT_TIME_ZONE) {
    const now = new Date()
    const dateString = new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(now)

    const offset = getTimeZoneOffset(timeZone, now)
    return new Date(`${dateString}T00:00:00${offset}`).toISOString()
}

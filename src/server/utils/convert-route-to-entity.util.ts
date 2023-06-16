const mapping: Record<string, string> = {
  clubs: 'club',
  'match-results': 'match_result',
  'poker-matches': 'poker_match',
  rsvps: 'rsvp',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

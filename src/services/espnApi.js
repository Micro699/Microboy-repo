import axios from 'axios';

const GLOBAL_SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/all/scoreboard';

export const fetchFixturesByDate = async (dateStr) => {
  try {
    const formattedDate = dateStr.replace(/-/g, '');
    const response = await axios.get(`${GLOBAL_SCOREBOARD_URL}?dates=${formattedDate}`);
    const events = response.data.events || [];

    if (events.length > 0) {
      return transformEspnEvents(events);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching real ESPN fixtures:', error);
    return [];
  }
};

const transformEspnEvents = (events) => {
  return events.map((event) => {
    const competition = event.competitions?.[0] || {};
    const homeTeam = competition.competitors?.find((c) => c.homeAway === 'home');
    const awayTeam = competition.competitors?.find((c) => c.homeAway === 'away');
    const status = event.status?.type || {};

    // Extract League & Gender Info
    const leagueObj = competition.league || event.season || {};
    const rawLeagueName = leagueObj.name || leagueObj.displayName || 'International Soccer';
    
    // Check if the competition is a women's league
    const isWomensLeague = 
      /women|wom|w\b/i.test(rawLeagueName) || 
      /women|wom|w\b/i.test(event.name || '') ||
      (leagueObj.slug && leagueObj.slug.includes('.w.'));

    let homeName = homeTeam?.team?.displayName || 'Home Team';
    let awayName = awayTeam?.team?.displayName || 'Away Team';

    // Append (W) if women's league and not already included
    if (isWomensLeague) {
      if (!/\bW\b/i.test(homeName)) homeName += ' W';
      if (!/\bW\b/i.test(awayName)) awayName += ' W';
    }

    return {
      id: event.id,
      name: event.name || `${homeName} vs ${awayName}`,
      leagueName: rawLeagueName,
      isWomens: isWomensLeague,
      date: event.date,
      status: {
        state: status.state || 'pre',
        detail: status.detail || '',
        shortDetail: status.shortDetail || '',
        completed: status.completed || false,
        clock: event.status?.displayClock || "0'",
        period: event.status?.period || 1,
      },
      homeTeam: {
        id: homeTeam?.team?.id,
        name: homeName,
        shortName: homeTeam?.team?.abbreviation || homeName.substring(0, 3).toUpperCase(),
        logo: homeTeam?.team?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(homeName)}&background=1e293b&color=fff`,
        score: parseInt(homeTeam?.score || '0', 10),
        record: homeTeam?.records?.[0]?.summary || '0-0-0',
      },
      awayTeam: {
        id: awayTeam?.team?.id,
        name: awayName,
        shortName: awayTeam?.team?.abbreviation || awayName.substring(0, 3).toUpperCase(),
        logo: awayTeam?.team?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(awayName)}&background=0f172a&color=fff`,
        score: parseInt(awayTeam?.score || '0', 10),
        record: awayTeam?.records?.[0]?.summary || '0-0-0',
      },
      venue: competition.venue?.fullName || 'Football Ground',
    };
  });
};

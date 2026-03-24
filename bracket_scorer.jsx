import { useState, useMemo } from "react";

const GAMES_DATA = {"games":[{"id":"E1","round":"R1","region":"east","label":"East: (1) Duke vs (16) Siena","pts":1,"t1":"Duke","t2":"Siena","picks":{"doug":"Duke","blair":"Duke","emma":"Duke","grace":"Duke","jeff":"Duke","leslie":"Duke","max":"Duke","phyllis":"Duke","rosie":"Duke","taylor":"Duke","lori":"Duke"}},{"id":"E2","round":"R1","region":"east","label":"East: (8) Ohio St. vs (9) TCU","pts":1,"t1":"Ohio St.","t2":"TCU","picks":{"doug":"Ohio St.","blair":"Ohio St.","emma":"TCU","grace":"TCU","jeff":"Ohio St.","leslie":"TCU","max":"Ohio St.","phyllis":"Ohio St.","rosie":"TCU","taylor":"Ohio St.","lori":"Ohio St."}},{"id":"E3","round":"R1","region":"east","label":"East: (5) St. John's vs (12) N. Iowa","pts":1,"t1":"St. John's","t2":"N. Iowa","picks":{"doug":"St. John's","blair":"St. John's","emma":"St. John's","grace":"N. Iowa","jeff":"N. Iowa","leslie":"St. John's","max":"N. Iowa","phyllis":"St. John's","rosie":"St. John's","taylor":"St. John's","lori":"N. Iowa"}},{"id":"E4","round":"R1","region":"east","label":"East: (4) Kansas vs (13) Cal Baptist","pts":1,"t1":"Kansas","t2":"Cal Baptist","picks":{"doug":"Kansas","blair":"Kansas","emma":"Kansas","grace":"Cal Baptist","jeff":"Kansas","leslie":"Kansas","max":"Kansas","phyllis":"Kansas","rosie":"Kansas","taylor":"Kansas","lori":"Kansas"}},{"id":"E5","round":"R1","region":"east","label":"East: (6) Louisville vs (11) SFLA","pts":1,"t1":"Louisville","t2":"SFLA","picks":{"doug":"SFLA","blair":"SFLA","emma":"SFLA","grace":"SFLA","jeff":"Louisville","leslie":"Louisville","max":"Louisville","phyllis":"Louisville","rosie":"SFLA","taylor":"SFLA","lori":"SFLA"}},{"id":"E6","round":"R1","region":"east","label":"East: (3) Mich. St. vs (14) NDAKST","pts":1,"t1":"Michigan St.","t2":"NDAKST","picks":{"doug":"Michigan St.","blair":"Michigan St.","emma":"Michigan St.","grace":"Michigan St.","jeff":"Michigan St.","leslie":"Michigan St.","max":"Michigan St.","phyllis":"Michigan St.","rosie":"Michigan St.","taylor":"Michigan St.","lori":"Michigan St."}},{"id":"E7","round":"R1","region":"east","label":"East: (7) UCLA vs (10) UCF","pts":1,"t1":"UCLA","t2":"UCF","picks":{"doug":"UCLA","blair":"UCLA","emma":"UCLA","grace":"UCLA","jeff":"UCLA","leslie":"UCF","max":"UCLA","phyllis":"UCF","rosie":"UCLA","taylor":"UCLA","lori":"UCLA"}},{"id":"E8","round":"R1","region":"east","label":"East: (2) UConn vs (15) Furman","pts":1,"t1":"UConn","t2":"Furman","picks":{"doug":"UConn","blair":"UConn","emma":"UConn","grace":"UConn","jeff":"UConn","leslie":"UConn","max":"UConn","phyllis":"UConn","rosie":"UConn","taylor":"UConn","lori":"UConn"}},{"id":"S1","round":"R1","region":"south","label":"South: (1) Florida vs (16) PVAM","pts":1,"t1":"Florida","t2":"PVAM","picks":{"doug":"Florida","blair":"Florida","emma":"Florida","grace":"Florida","jeff":"Florida","leslie":"Florida","max":"Florida","phyllis":"Florida","rosie":"Florida","taylor":"Florida","lori":"Florida"}},{"id":"S2","round":"R1","region":"south","label":"South: (8) Clemson vs (9) Iowa","pts":1,"t1":"Clemson","t2":"Iowa","picks":{"doug":"Iowa","blair":"Iowa","emma":"Clemson","grace":"Clemson","jeff":"Iowa","leslie":"Iowa","max":"Clemson","phyllis":"Iowa","rosie":"Iowa","taylor":"Iowa","lori":"Iowa"}},{"id":"S3","round":"R1","region":"south","label":"South: (5) Vanderbilt vs (12) McNeese","pts":1,"t1":"Vanderbilt","t2":"McNeese","picks":{"doug":"Vanderbilt","blair":"Vanderbilt","emma":"Vanderbilt","grace":"Vanderbilt","jeff":"Vanderbilt","leslie":"Vanderbilt","max":"Vanderbilt","phyllis":"Vanderbilt","rosie":"Vanderbilt","taylor":"Vanderbilt","lori":"Vanderbilt"}},{"id":"S4","round":"R1","region":"south","label":"South: (4) Nebraska vs (13) Troy","pts":1,"t1":"Nebraska","t2":"Troy","picks":{"doug":"Nebraska","blair":"Nebraska","emma":"Nebraska","grace":"Nebraska","jeff":"Nebraska","leslie":"Nebraska","max":"Nebraska","phyllis":"Nebraska","rosie":"Nebraska","taylor":"Nebraska","lori":"Nebraska"}},{"id":"S5","round":"R1","region":"south","label":"South: (6) N. Carolina vs (11) VCU","pts":1,"t1":"N. Carolina","t2":"VCU","picks":{"doug":"VCU","blair":"N. Carolina","emma":"N. Carolina","grace":"N. Carolina","jeff":"N. Carolina","leslie":"N. Carolina","max":"VCU","phyllis":"VCU","rosie":"N. Carolina","taylor":"VCU","lori":"VCU"}},{"id":"S6","round":"R1","region":"south","label":"South: (3) Illinois vs (14) Penn","pts":1,"t1":"Illinois","t2":"Penn","picks":{"doug":"Penn","blair":"Illinois","emma":"Illinois","grace":"Illinois","jeff":"Illinois","leslie":"Illinois","max":"Illinois","phyllis":"Illinois","rosie":"Illinois","taylor":"Illinois","lori":"Illinois"}},{"id":"S7","round":"R1","region":"south","label":"South: (7) St. Mary's vs (10) Texas A&M","pts":1,"t1":"MARYCA","t2":"Texas A&M","picks":{"doug":"MARYCA","blair":"Texas A&M","emma":"MARYCA","grace":"Texas A&M","jeff":"MARYCA","leslie":"Texas A&M","max":"Texas A&M","phyllis":"Texas A&M","rosie":"MARYCA","taylor":"MARYCA","lori":"MARYCA"}},{"id":"S8","round":"R1","region":"south","label":"South: (2) Houston vs (15) Idaho","pts":1,"t1":"Houston","t2":"Idaho","picks":{"doug":"Houston","blair":"Houston","emma":"Houston","grace":"Houston","jeff":"Houston","leslie":"Houston","max":"Houston","phyllis":"Houston","rosie":"Houston","taylor":"Houston","lori":"Houston"}},{"id":"W1","round":"R1","region":"west","label":"West: (1) Arizona vs (16) LIU","pts":1,"t1":"Arizona","t2":"LIU","picks":{"doug":"Arizona","blair":"Arizona","emma":"Arizona","grace":"Arizona","jeff":"Arizona","leslie":"Arizona","max":"Arizona","phyllis":"Arizona","rosie":"Arizona","taylor":"Arizona","lori":"Arizona"}},{"id":"W2","round":"R1","region":"west","label":"West: (8) Villanova vs (9) Utah St.","pts":1,"t1":"Villanova","t2":"Utah St.","picks":{"doug":"Utah St.","blair":"Villanova","emma":"Villanova","grace":"Villanova","jeff":"Villanova","leslie":"Utah St.","max":"Villanova","phyllis":"Villanova","rosie":"Villanova","taylor":"Utah St.","lori":"Villanova"}},{"id":"W3","round":"R1","region":"west","label":"West: (5) Wisconsin vs (12) High Point","pts":1,"t1":"Wisconsin","t2":"High Point","picks":{"doug":"Wisconsin","blair":"Wisconsin","emma":"Wisconsin","grace":"Wisconsin","jeff":"Wisconsin","leslie":"Wisconsin","max":"High Point","phyllis":"Wisconsin","rosie":"Wisconsin","taylor":"Wisconsin","lori":"Wisconsin"}},{"id":"W4","round":"R1","region":"west","label":"West: (4) Arkansas vs (13) Hawaii","pts":1,"t1":"Arkansas","t2":"Hawaii","picks":{"doug":"Arkansas","blair":"Arkansas","emma":"Arkansas","grace":"Hawaii","jeff":"Arkansas","leslie":"Arkansas","max":"Arkansas","phyllis":"Arkansas","rosie":"Arkansas","taylor":"Arkansas","lori":"Arkansas"}},{"id":"W5","round":"R1","region":"west","label":"West: (6) BYU vs (11) Texas","pts":1,"t1":"BYU","t2":"Texas","picks":{"doug":"BYU","blair":"BYU","emma":"Texas","grace":"BYU","jeff":"BYU","leslie":"Texas","max":"BYU","phyllis":"BYU","rosie":"BYU","taylor":"BYU","lori":"BYU"}},{"id":"W6","round":"R1","region":"west","label":"West: (3) Gonzaga vs (14) Kennesaw St.","pts":1,"t1":"Gonzaga","t2":"KENSAW","picks":{"doug":"Gonzaga","blair":"Gonzaga","emma":"Gonzaga","grace":"KENSAW","jeff":"Gonzaga","leslie":"KENSAW","max":"Gonzaga","phyllis":"Gonzaga","rosie":"Gonzaga","taylor":"Gonzaga","lori":"Gonzaga"}},{"id":"W7","round":"R1","region":"west","label":"West: (7) Miami vs (10) Missouri","pts":1,"t1":"Miami","t2":"Missouri","picks":{"doug":"Miami","blair":"Miami","emma":"Missouri","grace":"Miami","jeff":"Miami","leslie":"Missouri","max":"Miami","phyllis":"Missouri","rosie":"Miami","taylor":"Miami","lori":"Missouri"}},{"id":"W8","round":"R1","region":"west","label":"West: (2) Purdue vs (15) Queens","pts":1,"t1":"Purdue","t2":"Queens","picks":{"doug":"Purdue","blair":"Purdue","emma":"Purdue","grace":"Purdue","jeff":"Purdue","leslie":"Purdue","max":"Purdue","phyllis":"Purdue","rosie":"Purdue","taylor":"Purdue","lori":"Purdue"}},{"id":"M1","round":"R1","region":"midwest","label":"Midwest: (1) Michigan vs (16) Howard","pts":1,"t1":"Michigan","t2":"Howard","picks":{"doug":"Michigan","blair":"Michigan","emma":"Michigan","grace":"Michigan","jeff":"Michigan","leslie":"Michigan","max":"Michigan","phyllis":"Michigan","rosie":"Michigan","taylor":"Michigan","lori":"Michigan"}},{"id":"M2","round":"R1","region":"midwest","label":"Midwest: (8) Georgia vs (9) St. Louis","pts":1,"t1":"Georgia","t2":"St. Louis","picks":{"doug":"St. Louis","blair":"Georgia","emma":"Georgia","grace":"Georgia","jeff":"St. Louis","leslie":"Georgia","max":"Georgia","phyllis":"Georgia","rosie":"St. Louis","taylor":"Georgia","lori":"Georgia"}},{"id":"M3","round":"R1","region":"midwest","label":"Midwest: (5) Texas Tech vs (12) Akron","pts":1,"t1":"Texas Tech","t2":"Akron","picks":{"doug":"Texas Tech","blair":"Texas Tech","emma":"Texas Tech","grace":"Akron","jeff":"Texas Tech","leslie":"Texas Tech","max":"Texas Tech","phyllis":"Texas Tech","rosie":"Texas Tech","taylor":"Texas Tech","lori":"Texas Tech"}},{"id":"M4","round":"R1","region":"midwest","label":"Midwest: (4) Alabama vs (13) Hofstra","pts":1,"t1":"Alabama","t2":"Hofstra","picks":{"doug":"Alabama","blair":"Alabama","emma":"Alabama","grace":"Alabama","jeff":"Hofstra","leslie":"Alabama","max":"Alabama","phyllis":"Alabama","rosie":"Alabama","taylor":"Alabama","lori":"Alabama"}},{"id":"M5","round":"R1","region":"midwest","label":"Midwest: (6) Tennessee vs (11) MIAOH","pts":1,"t1":"Tennessee","t2":"MIAOH","picks":{"doug":"MIAOH","blair":"Tennessee","emma":"Tennessee","grace":"Tennessee","jeff":"Tennessee","leslie":"Tennessee","max":"MIAOH","phyllis":"Tennessee","rosie":"Tennessee","taylor":"Tennessee","lori":"Tennessee"}},{"id":"M6","round":"R1","region":"midwest","label":"Midwest: (3) Virginia vs (14) Wright St.","pts":1,"t1":"Virginia","t2":"Wright St.","picks":{"doug":"Virginia","blair":"Virginia","emma":"Virginia","grace":"Virginia","jeff":"Virginia","leslie":"Virginia","max":"Virginia","phyllis":"Virginia","rosie":"Virginia","taylor":"Virginia","lori":"Virginia"}},{"id":"M7","round":"R1","region":"midwest","label":"Midwest: (7) Kentucky vs (10) Santa Clara","pts":1,"t1":"Kentucky","t2":"Santa Clara","picks":{"doug":"Santa Clara","blair":"Santa Clara","emma":"Kentucky","grace":"Santa Clara","jeff":"Santa Clara","leslie":"Kentucky","max":"Santa Clara","phyllis":"Kentucky","rosie":"Kentucky","taylor":"Santa Clara","lori":"Santa Clara"}},{"id":"M8","round":"R1","region":"midwest","label":"Midwest: (2) Iowa St. vs (15) Tenn. State","pts":1,"t1":"Iowa St.","t2":"Tenn. State","picks":{"doug":"Iowa St.","blair":"Iowa St.","emma":"Iowa St.","grace":"Iowa St.","jeff":"Iowa St.","leslie":"Iowa St.","max":"Iowa St.","phyllis":"Iowa St.","rosie":"Iowa St.","taylor":"Iowa St.","lori":"Iowa St."}},{"id":"EA","round":"R2","region":"east","label":"East R2: 1/8/9 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Duke","blair":"Duke","emma":"Duke","grace":"Duke","jeff":"Duke","leslie":"Duke","max":"Ohio St.","phyllis":"Duke","rosie":"Duke","taylor":"Duke","lori":"Duke"}},{"id":"EB","round":"R2","region":"east","label":"East R2: 5/4 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"St. John's","blair":"St. John's","emma":"St. John's","grace":"N. Iowa","jeff":"N. Iowa","leslie":"St. John's","max":"Kansas","phyllis":"St. John's","rosie":"Kansas","taylor":"Kansas","lori":"Kansas"}},{"id":"EC","round":"R2","region":"east","label":"East R2: 6/3 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Michigan St.","blair":"SFLA","emma":"Michigan St.","grace":"Michigan St.","jeff":"Michigan St.","leslie":"Louisville","max":"Louisville","phyllis":"Michigan St.","rosie":"Michigan St.","taylor":"Michigan St.","lori":"Michigan St."}},{"id":"ED","round":"R2","region":"east","label":"East R2: 7/2 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"UConn","blair":"UConn","emma":"UCLA","grace":"UConn","jeff":"UConn","leslie":"UConn","max":"UConn","phyllis":"UConn","rosie":"UConn","taylor":"UConn","lori":"UConn"}},{"id":"SA","round":"R2","region":"south","label":"South R2: 1/8/9 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Florida","blair":"Florida","emma":"Florida","grace":"Florida","jeff":"Florida","leslie":"Florida","max":"Florida","phyllis":"Florida","rosie":"Florida","taylor":"Florida","lori":"Florida"}},{"id":"SB","round":"R2","region":"south","label":"South R2: 5/4 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Vanderbilt","blair":"Vanderbilt","emma":"Vanderbilt","grace":"Vanderbilt","jeff":"Vanderbilt","leslie":"Vanderbilt","max":"Vanderbilt","phyllis":"Vanderbilt","rosie":"Vanderbilt","taylor":"Vanderbilt","lori":"Vanderbilt"}},{"id":"SC","round":"R2","region":"south","label":"South R2: 6/3 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"VCU","blair":"Illinois","emma":"N. Carolina","grace":"Illinois","jeff":"Illinois","leslie":"N. Carolina","max":"Illinois","phyllis":"Illinois","rosie":"Illinois","taylor":"Illinois","lori":"Illinois"}},{"id":"SD","round":"R2","region":"south","label":"South R2: 7/2 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Houston","blair":"Houston","emma":"Houston","grace":"Houston","jeff":"Houston","leslie":"Houston","max":"Houston","phyllis":"Houston","rosie":"Houston","taylor":"Houston","lori":"Houston"}},{"id":"WA","round":"R2","region":"west","label":"West R2: 1/8/9 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Arizona","blair":"Arizona","emma":"Arizona","grace":"Arizona","jeff":"Arizona","leslie":"Arizona","max":"Arizona","phyllis":"Arizona","rosie":"Arizona","taylor":"Arizona","lori":"Arizona"}},{"id":"WB","round":"R2","region":"west","label":"West R2: 5/4 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Arkansas","blair":"Arkansas","emma":"Arkansas","grace":"Wisconsin","jeff":"Wisconsin","leslie":"Arkansas","max":"Arkansas","phyllis":"Wisconsin","rosie":"Arkansas","taylor":"Arkansas","lori":"Wisconsin"}},{"id":"WC","round":"R2","region":"west","label":"West R2: 6/3 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Gonzaga","blair":"BYU","emma":"Gonzaga","grace":"BYU","jeff":"BYU","leslie":"Texas","max":"BYU","phyllis":"BYU","rosie":"Gonzaga","taylor":"Gonzaga","lori":"Gonzaga"}},{"id":"WD","round":"R2","region":"west","label":"West R2: 7/2 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Purdue","blair":"Purdue","emma":"Purdue","grace":"Purdue","jeff":"Purdue","leslie":"Purdue","max":"Purdue","phyllis":"Purdue","rosie":"Purdue","taylor":"Purdue","lori":"Purdue"}},{"id":"MA","round":"R2","region":"midwest","label":"Midwest R2: 1/8/9 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Michigan","blair":"Michigan","emma":"Michigan","grace":"Michigan","jeff":"Michigan","leslie":"Michigan","max":"Michigan","phyllis":"Michigan","rosie":"Michigan","taylor":"Michigan","lori":"Michigan"}},{"id":"MB","round":"R2","region":"midwest","label":"Midwest R2: 5/4 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Alabama","blair":"Alabama","emma":"Texas Tech","grace":"Alabama","jeff":"Texas Tech","leslie":"Texas Tech","max":"Texas Tech","phyllis":"Texas Tech","rosie":"Alabama","taylor":"Texas Tech","lori":"Texas Tech"}},{"id":"MC","round":"R2","region":"midwest","label":"Midwest R2: 6/3 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Virginia","blair":"Virginia","emma":"Tennessee","grace":"Tennessee","jeff":"Virginia","leslie":"Virginia","max":"MIAOH","phyllis":"Virginia","rosie":"Tennessee","taylor":"Virginia","lori":"Virginia"}},{"id":"MD","round":"R2","region":"midwest","label":"Midwest R2: 7/2 side","pts":2,"t1":null,"t2":null,"picks":{"doug":"Santa Clara","blair":"Iowa St.","emma":"Kentucky","grace":"Iowa St.","jeff":"Iowa St.","leslie":"Kentucky","max":"Iowa St.","phyllis":"Kentucky","rosie":"Iowa St.","taylor":"Iowa St.","lori":"Iowa St."}},{"id":"ES1","round":"S16","region":"east","label":"East Sweet 16 (top)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Duke","blair":"Duke","emma":"Duke","grace":"Duke","jeff":"Duke","leslie":"Duke","max":"Kansas","phyllis":"Duke","rosie":"Kansas","taylor":"Duke","lori":"Duke"}},{"id":"ES2","round":"S16","region":"east","label":"East Sweet 16 (bottom)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Michigan St.","blair":"UConn","emma":"Michigan St.","grace":"UConn","jeff":"UConn","leslie":"UConn","max":"UConn","phyllis":"UConn","rosie":"Michigan St.","taylor":"UConn","lori":"Michigan St."}},{"id":"SS1","round":"S16","region":"south","label":"South Sweet 16 (top)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Florida","blair":"Florida","emma":"Florida","grace":"Florida","jeff":"Florida","leslie":"Florida","max":"Florida","phyllis":"Florida","rosie":"Florida","taylor":"Florida","lori":"Florida"}},{"id":"SS2","round":"S16","region":"south","label":"South Sweet 16 (bottom)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Houston","blair":"Houston","emma":"Houston","grace":"Illinois","jeff":"Houston","leslie":"N. Carolina","max":"Illinois","phyllis":"Houston","rosie":"Illinois","taylor":"Illinois","lori":"Houston"}},{"id":"WS1","round":"S16","region":"west","label":"West Sweet 16 (top)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Arizona","blair":"Arizona","emma":"Arizona","grace":"Arizona","jeff":"Wisconsin","leslie":"Arizona","max":"Arizona","phyllis":"Arizona","rosie":"Arkansas","taylor":"Arizona","lori":"Arizona"}},{"id":"WS2","round":"S16","region":"west","label":"West Sweet 16 (bottom)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Purdue","blair":"Purdue","emma":"Purdue","grace":"Purdue","jeff":"Purdue","leslie":"Purdue","max":"Purdue","phyllis":"Purdue","rosie":"Purdue","taylor":"Purdue","lori":"Purdue"}},{"id":"MS1","round":"S16","region":"midwest","label":"Midwest Sweet 16 (top)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Michigan","blair":"Michigan","emma":"Texas Tech","grace":"Michigan","jeff":"Michigan","leslie":"Michigan","max":"Michigan","phyllis":"Michigan","rosie":"Alabama","taylor":"Michigan","lori":"Michigan"}},{"id":"MS2","round":"S16","region":"midwest","label":"Midwest Sweet 16 (bottom)","pts":4,"t1":null,"t2":null,"picks":{"doug":"Virginia","blair":"Iowa St.","emma":"Tennessee","grace":"Iowa St.","jeff":"Virginia","leslie":"Kentucky","max":"Iowa St.","phyllis":"Virginia","rosie":"Tennessee","taylor":"Virginia","lori":"Iowa St."}},{"id":"EE8","round":"E8","region":"east","label":"East Elite 8","pts":8,"t1":null,"t2":null,"picks":{"doug":"Duke","blair":"Duke","emma":"Duke","grace":"UConn","jeff":"Duke","leslie":"UConn","max":"UConn","phyllis":"Duke","rosie":"Michigan St.","taylor":"Duke","lori":"Michigan St."}},{"id":"SE8","round":"E8","region":"south","label":"South Elite 8","pts":8,"t1":null,"t2":null,"picks":{"doug":"Houston","blair":"Florida","emma":"Houston","grace":"Illinois","jeff":"Houston","leslie":"N. Carolina","max":"Illinois","phyllis":"Houston","rosie":"Illinois","taylor":"Florida","lori":"Houston"}},{"id":"WE8","round":"E8","region":"west","label":"West Elite 8","pts":8,"t1":null,"t2":null,"picks":{"doug":"Arizona","blair":"Arizona","emma":"Arizona","grace":"Purdue","jeff":"Wisconsin","leslie":"Purdue","max":"Arizona","phyllis":"Arizona","rosie":"Purdue","taylor":"Arizona","lori":"Arizona"}},{"id":"ME8","round":"E8","region":"midwest","label":"Midwest Elite 8","pts":8,"t1":null,"t2":null,"picks":{"doug":"Michigan","blair":"Michigan","emma":"Texas Tech","grace":"Michigan","jeff":"Michigan","leslie":"Kentucky","max":"Michigan","phyllis":"Virginia","rosie":"Alabama","taylor":"Michigan","lori":"Michigan"}},{"id":"FFL","round":"FF","region":null,"label":"Final Four (East vs South)","pts":16,"t1":null,"t2":null,"picks":{"doug":"Houston","blair":"Duke","emma":"Duke","grace":"UConn","jeff":"Houston","leslie":"UConn","max":"Illinois","phyllis":"Houston","rosie":"Michigan St.","taylor":"Florida","lori":"Houston"}},{"id":"FFR","round":"FF","region":null,"label":"Final Four (West vs Midwest)","pts":16,"t1":null,"t2":null,"picks":{"doug":"Michigan","blair":"Michigan","emma":"Arizona","grace":"Michigan","jeff":"Michigan","leslie":"Purdue","max":"Arizona","phyllis":"Arizona","rosie":"Alabama","taylor":"Michigan","lori":"Arizona"}},{"id":"CHAMP","round":"CHAMP","region":null,"label":"National Championship","pts":32,"t1":null,"t2":null,"picks":{"doug":"Michigan","blair":"Duke","emma":"Arizona","grace":"Michigan","jeff":"Michigan","leslie":"UConn","max":"Illinois","phyllis":"Arizona","rosie":"Michigan St.","taylor":"Florida","lori":"Arizona"}}],"known_results":{"E1":"Duke","E2":"TCU","E3":"St. John's","E4":"Kansas","E5":"Louisville","E6":"Michigan St.","E7":"UCLA","E8":"UConn","S1":"Florida","S2":"Iowa","S3":"Vanderbilt","S4":"Nebraska","S5":"VCU","S6":"Illinois","S7":"Texas A&M","S8":"Houston","W1":"Arizona","W2":"Utah St.","W3":"High Point","W4":"Arkansas","W5":"Texas","W6":"Gonzaga","W7":"Miami","W8":"Purdue","M1":"Michigan","M2":"St. Louis","M3":"Texas Tech","M4":"Alabama","M5":"Tennessee","M6":"Virginia","M7":"Kentucky","M8":"Iowa St."},"names":{"doug":"Doug Marttila","blair":"Blair Darling","emma":"Emma Walton","grace":"Grace Darling","jeff":"Jeff Varhol","leslie":"Leslie Walton","max":"Max Darling","phyllis":"Phyllis Darling","rosie":"Rosie Marttila","taylor":"Taylor Walton","lori":"Lori Moravec"},"people":["doug","blair","emma","grace","jeff","leslie","max","phyllis","rosie","taylor","lori"]} ;


const ROUND_ORDER = ["R1","R2","S16","E8","FF","CHAMP"];
const ROUND_LABELS = {R1:"Round of 64",R2:"Round of 32",S16:"Sweet 16",E8:"Elite 8",FF:"Final Four",CHAMP:"Championship"};
const ROUND_PTS = {R1:1,R2:2,S16:4,E8:8,FF:16,CHAMP:32};
const REGION_COLORS = {east:"#818cf8",south:"#f87171",west:"#fb923c",midwest:"#4ade80"};
const REGION_LABELS = {east:"East",south:"South",west:"West",midwest:"Midwest"};
const CHAMP_PICKS = {doug:"Michigan",blair:"Duke",emma:"Arizona",grace:"Michigan",jeff:"Michigan",leslie:"UConn",max:"Illinois",phyllis:"Arizona",rosie:"Michigan St.",taylor:"Florida",lori:"Arizona"};

const short = t => t.length > 11 ? t.replace("Michigan St.","Mich. St.").replace("St. John's","St. John's").replace("Cal Baptist","Cal Bap.").replace("Tenn. State","Tenn. St.").replace("Texas Tech","Tex. Tech").replace("High Point","Hi. Point").replace("Iowa St.","Iowa St.") : t;

export default function BracketScorer() {
  const { games, known_results, names, people } = GAMES_DATA;

  const [results, setResults] = useState(known_results);
  const [activeRound, setActiveRound] = useState("R1");
  const [expandedGame, setExpandedGame] = useState(null);
  const [pickerTooltip, setPickerTooltip] = useState(null); // "gameId:team"

  const setWinner = (gameId, team) => {
    setResults(r => ({ ...r, [gameId]: r[gameId] === team ? null : team }));
  };

  const scores = useMemo(() => {
    const s = {};
    people.forEach(p => { s[p] = { total: 0, byRound: {} }; });
    games.forEach(g => {
      const winner = results[g.id];
      people.forEach(p => {
        const pick = g.picks[p];
        const correct = winner && pick === winner;
        if (!s[p].byRound[g.round]) s[p].byRound[g.round] = 0;
        if (correct) {
          s[p].total += g.pts;
          s[p].byRound[g.round] += g.pts;
        }
      });
    });
    return s;
  }, [results]);

  const maxPossible = useMemo(() => {
    const mp = {};
    people.forEach(p => {
      let possible = scores[p].total;
      games.forEach(g => {
        if (!results[g.id] && g.picks[p]) possible += g.pts;
      });
      mp[p] = possible;
    });
    return mp;
  }, [scores, results]);

  const canWin = useMemo(() => {
    const bestCurrent = Math.max(...people.map(p => scores[p].total));
    const cw = {};
    people.forEach(p => { cw[p] = maxPossible[p] >= bestCurrent; });
    return cw;
  }, [scores, maxPossible]);

  const ranked = [...people].sort((a,b) => scores[b].total - scores[a].total || maxPossible[b] - maxPossible[a]);
  const roundGames = games.filter(g => g.round === activeRound);

  const cardBg = "#1e293b";
  const pageBg = "#0f172a";

  return (
    <div style={{fontFamily:"system-ui,sans-serif",background:pageBg,minHeight:"100vh",color:"#e2e8f0"}}>

      {/* Header */}
      <div style={{background:"#0c1a2e",padding:"16px 20px",borderBottom:"1px solid #1e293b",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:22}}>🏀</span>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"#f1f5f9"}}>2026 March Madness Pool</div>
          <div style={{fontSize:11,color:"#64748b"}}>{Object.keys(results).length} / 63 results entered · Click team to set winner, click again to clear</div>
        </div>
      </div>

      {/* Leaderboard strip */}
      <div style={{background:"#0c1a2e",padding:"12px 20px",borderBottom:"2px solid #1e293b",overflowX:"auto",whiteSpace:"nowrap"}}>
        {ranked.map((p,i) => {
          const medal = i===0?"🥇":i===1?"🥈":i===2?"🥉":"";
          const lead = i===0;
          return (
            <span key={p} style={{display:"inline-block",marginRight:8,
              background: lead ? "#1e3a5f" : "#1e293b",
              border: lead ? "1px solid #3b82f6" : "1px solid #334155",
              borderRadius:8,padding:"8px 12px",textAlign:"center",verticalAlign:"top",
              boxShadow: lead ? "0 0 10px rgba(59,130,246,0.25)" : "none"}}>
              <div style={{fontSize:10,color:lead?"#93c5fd":"#64748b"}}>{medal} #{i+1}</div>
              <div style={{fontSize:12,fontWeight:600,color:lead?"#e2e8f0":"#94a3b8"}}>{names[p].split(" ")[0]}</div>
              <div style={{fontSize:20,fontWeight:700,color:lead?"#60a5fa":"#64748b",lineHeight:"1.1"}}>{scores[p].total}</div>
              <div style={{fontSize:9,color:"#475569"}}>max {maxPossible[p]}</div>
              <div style={{fontSize:9,marginTop:3,borderTop:"1px solid #1e293b",paddingTop:3,
                color: canWin[p] ? "#4ade80" : "#ef4444", fontWeight:700}}>
                {canWin[p] ? "✓ ALIVE" : "✗ OUT"}
              </div>
              <div style={{fontSize:9,color:"#334155",marginTop:2}}>🏆 {CHAMP_PICKS[p]}</div>
            </span>
          );
        })}
      </div>

      {/* Round tabs */}
      <div style={{display:"flex",padding:"0 20px",borderBottom:"1px solid #1e293b",background:pageBg,overflowX:"auto"}}>
        {ROUND_ORDER.map(r => {
          const rg = games.filter(g => g.round === r);
          const done = rg.filter(g => results[g.id]).length;
          const active = r === activeRound;
          return (
            <button key={r} onClick={() => setActiveRound(r)} style={{
              padding:"10px 14px",border:"none",cursor:"pointer",background:"transparent",
              color: active ? "#f1f5f9" : "#64748b",
              fontWeight: active ? 700 : 400,fontSize:13,
              borderBottom: active ? "3px solid #3b82f6" : "3px solid transparent",
              whiteSpace:"nowrap"
            }}>
              {ROUND_LABELS[r]}
              <span style={{marginLeft:5,fontSize:10,
                color: done===rg.length&&done>0 ? "#22c55e" : active ? "#94a3b8" : "#334155"}}>
                {done}/{rg.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Game cards */}
      <div style={{padding:"16px 20px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:10}}>
        {roundGames.map(g => {
          const winner = results[g.id];
          const rc = REGION_COLORS[g.region] || "#818cf8";
          const expanded = expandedGame === g.id;
          const pickCount = {};
          people.forEach(p => {
            const pk = g.picks[p];
            if (pk) { if (!pickCount[pk]) pickCount[pk] = []; pickCount[pk].push(names[p].split(" ")[0]); }
          });
          const teams = g.t1 && g.t2 ? [g.t1, g.t2] : Object.keys(pickCount).sort((a,b) => (pickCount[b]||[]).length-(pickCount[a]||[]).length);

          return (
            <div key={g.id} style={{background:cardBg,borderRadius:10,border:"1px solid #334155",overflow:"hidden"}}>
              <div style={{background:rc+"18",borderBottom:"1px solid "+rc+"44",padding:"7px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,color:rc,letterSpacing:"0.5px",textTransform:"uppercase"}}>
                  {g.region ? REGION_LABELS[g.region] : ""} {g.pts > 1 ? "· "+g.pts+"pts" : "· 1pt"}
                </span>
                <button onClick={() => setExpandedGame(expanded ? null : g.id)}
                  style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:10,padding:0}}>
                  {expanded ? "▲" : "▼"} picks
                </button>
              </div>

              <div style={{padding:"10px"}}>
                <div style={{fontSize:11,color:"#64748b",marginBottom:8}}>{g.label}</div>

                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  {teams.map(team => {
                    const isWin = winner === team;
                    const isLoss = winner && winner !== team;
                    const cnt = (pickCount[team]||[]).length;
                    const pickers = pickCount[team]||[];
                    const tooltipKey = g.id+":"+team;
                    const showPickers = pickerTooltip === tooltipKey;
                    return (
                      <div key={team}>
                        <button onClick={() => setWinner(g.id, team)} style={{
                          display:"flex",alignItems:"center",justifyContent:"space-between",
                          width:"100%",padding:"8px 10px",borderRadius:7,cursor:"pointer",textAlign:"left",
                          border: isWin ? "2px solid #22c55e" : isLoss ? "1px solid #1e293b" : "1px solid #475569",
                          background: isWin ? "#052e16" : isLoss ? "#0f172a" : "#0f172a",
                          color: isWin ? "#86efac" : isLoss ? "#334155" : "#e2e8f0",
                          fontWeight: isWin ? 700 : 400,fontSize:13,
                        }}>
                          <span>{short(team)} {isWin ? "✓" : ""}</span>
                          {cnt > 0 && (
                            <span onClick={e => { e.stopPropagation(); setPickerTooltip(showPickers ? null : tooltipKey); }}
                              style={{fontSize:10,color:isWin?"#4ade80":isLoss?"#1e293b":"#94a3b8",
                                background:"#1e293b",borderRadius:4,padding:"2px 5px",cursor:"pointer"}}>
                              {cnt}/{people.length}
                            </span>
                          )}
                        </button>
                        {showPickers && (
                          <div style={{padding:"5px 10px 6px",background:"#0f172a",borderRadius:"0 0 6px 6px",
                            display:"flex",flexWrap:"wrap",gap:4}}>
                            {pickers.map(name => (
                              <span key={name} style={{fontSize:10,padding:"2px 6px",borderRadius:4,
                                background:"#1e3a5f",color:"#93c5fd",border:"1px solid #1e40af"}}>
                                {name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {expanded && (
                  <div style={{marginTop:8,padding:"8px",background:pageBg,borderRadius:6,display:"flex",flexWrap:"wrap",gap:4}}>
                    {people.map(p => {
                      const pick = g.picks[p];
                      const correct = winner && pick === winner;
                      const wrong = winner && pick && pick !== winner;
                      return (
                        <span key={p} style={{
                          fontSize:10,padding:"3px 6px",borderRadius:4,
                          background: correct ? "#052e16" : wrong ? "#2d0a0a" : "#1e293b",
                          color: correct ? "#86efac" : wrong ? "#fca5a5" : "#64748b",
                          border: "1px solid " + (correct ? "#166534" : wrong ? "#7f1d1d" : "#334155")
                        }}>
                          {names[p].split(" ")[0]}: {pick ? short(pick) : "?"} {correct?"✓":wrong?"✗":""}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Score table */}
      <div style={{padding:"0 20px 40px"}}>
        <div style={{fontSize:12,color:"#64748b",marginBottom:8,fontWeight:500}}>Full Score Breakdown</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,background:cardBg,borderRadius:8,overflow:"hidden"}}>
            <thead>
              <tr style={{background:"#0f172a"}}>
                <th style={{textAlign:"left",padding:"8px 12px",color:"#94a3b8",fontWeight:600}}>Player</th>
                {ROUND_ORDER.map(r => <th key={r} style={{textAlign:"center",padding:"8px",color:"#64748b",fontWeight:400,fontSize:11}}>{ROUND_LABELS[r]}</th>)}
                <th style={{textAlign:"center",padding:"8px 12px",color:"#94a3b8",fontWeight:600}}>Total</th>
                <th style={{textAlign:"center",padding:"8px 12px",color:"#64748b",fontWeight:400,fontSize:11}}>Max</th>
                <th style={{textAlign:"center",padding:"8px 12px",color:"#64748b",fontWeight:400,fontSize:11}}>Can Win?</th>
                <th style={{textAlign:"center",padding:"8px 12px",color:"#64748b",fontWeight:400,fontSize:11}}>🏆 Pick</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((p,i) => (
                <tr key={p} style={{borderTop:"1px solid #1e293b",background:i%2===0?"#1a2744":"transparent"}}>
                  <td style={{padding:"7px 12px",color:i===0?"#93c5fd":"#cbd5e1",fontWeight:i===0?700:400}}>
                    {names[p]}
                  </td>
                  {ROUND_ORDER.map(r => (
                    <td key={r} style={{textAlign:"center",padding:"7px 8px",
                      color: (scores[p].byRound[r]||0)>0 ? "#86efac" : "#334155",fontWeight:400}}>
                      {scores[p].byRound[r] || "—"}
                    </td>
                  ))}
                  <td style={{textAlign:"center",padding:"7px 12px",fontWeight:700,color:"#60a5fa",fontSize:14}}>{scores[p].total}</td>
                  <td style={{textAlign:"center",padding:"7px 12px",color:"#475569",fontSize:11}}>{maxPossible[p]}</td>
                  <td style={{textAlign:"center",padding:"7px 12px",fontWeight:700,fontSize:12,
                    color: canWin[p] ? "#4ade80" : "#ef4444"}}>
                    {canWin[p] ? "✓" : "✗"}
                  </td>
                  <td style={{textAlign:"center",padding:"7px 12px",color:"#94a3b8",fontSize:11}}>{CHAMP_PICKS[p]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

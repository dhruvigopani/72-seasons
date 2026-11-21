// 72 Seasons: a Scriptable widget for Japan's micro-season calendar (shichijūni kō).
// The old calendar splits the year into 24 major seasons (sekki), each cut into
// three micro-seasons of about five days, named for what is happening in nature.
// Each day brings a small cue, and the widget's color drifts slowly from one
// season to the next.
//
// Setup
// 1. In Scriptable tap +, paste all of this, and name the script "72 Seasons".
// 2. Long press your Home Screen, add a small, medium or large Scriptable widget,
//    Edit Widget, and choose 72 Seasons as Script.
// 3. Lock Screen: add a Scriptable widget (inline or rectangular)
//    and choose 72 Seasons the same way.
// Start dates can shift by a day from year to year.

// [month, day, kanji, romaji, english]
const KO = [
  [2,4,"東風解凍","Harukaze kōri o toku","East wind melts the ice"],
  [2,9,"黄鶯睍睆","Kōō kenkan su","Warblers sing in the hills"],
  [2,14,"魚上氷","Uo kōri o izuru","Fish rise from the ice"],
  [2,19,"土脉潤起","Tsuchi no shō uruoi okoru","Rain moistens the soil"],
  [2,24,"霞始靆","Kasumi hajimete tanabiku","Mist starts to linger"],
  [3,1,"草木萌動","Sōmoku mebae izuru","Grass sprouts, trees bud"],
  [3,6,"蟄虫啓戸","Sugomori mushi to o hiraku","Hibernating insects surface"],
  [3,11,"桃始笑","Momo hajimete saku","First peach blossoms"],
  [3,16,"菜虫化蝶","Namushi chō to naru","Caterpillars become butterflies"],
  [3,21,"雀始巣","Suzume hajimete sukuu","Sparrows start to nest"],
  [3,26,"櫻始開","Sakura hajimete saku","First cherry blossoms"],
  [3,31,"雷乃発声","Kaminari sunawachi koe o hassu","Distant thunder"],
  [4,5,"玄鳥至","Tsubame kitaru","Swallows return"],
  [4,10,"鴻雁北","Kōgan kaeru","Wild geese fly north"],
  [4,15,"虹始見","Niji hajimete arawaru","First rainbows"],
  [4,20,"葭始生","Ashi hajimete shōzu","First reeds sprout"],
  [4,25,"霜止出苗","Shimo yamite nae izuru","Last frost, rice seedlings grow"],
  [4,30,"牡丹華","Botan hana saku","Peonies bloom"],
  [5,5,"蛙始鳴","Kawazu hajimete naku","Frogs start singing"],
  [5,10,"蚯蚓出","Mimizu izuru","Worms surface"],
  [5,15,"竹笋生","Takenoko shōzu","Bamboo shoots sprout"],
  [5,21,"蚕起食桑","Kaiko okite kuwa o hamu","Silkworms feast on mulberry"],
  [5,26,"紅花栄","Benibana sakau","Safflowers bloom"],
  [5,31,"麦秋至","Mugi no toki itaru","Wheat ripens"],
  [6,6,"蟷螂生","Kamakiri shōzu","Praying mantises hatch"],
  [6,11,"腐草為螢","Kusaretaru kusa hotaru to naru","Fireflies rise from the grass"],
  [6,16,"梅子黄","Ume no mi kibamu","Plums turn yellow"],
  [6,21,"乃東枯","Natsukarekusa karuru","Self-heal withers"],
  [6,27,"菖蒲華","Ayame hana saku","Irises bloom"],
  [7,2,"半夏生","Hange shōzu","Crow-dipper sprouts"],
  [7,7,"温風至","Atsukaze itaru","Warm winds blow"],
  [7,12,"蓮始開","Hasu hajimete hiraku","First lotus blossoms"],
  [7,17,"鷹乃学習","Taka sunawachi waza o narau","Hawks learn to fly"],
  [7,23,"桐始結花","Kiri hajimete hana o musubu","Paulownia trees seed"],
  [7,29,"土潤溽暑","Tsuchi uruōte mushiatsushi","Damp earth, humid air"],
  [8,3,"大雨時行","Taiu tokidoki furu","Great rains sometimes fall"],
  [8,8,"涼風至","Suzukaze itaru","Cool winds blow"],
  [8,13,"寒蝉鳴","Higurashi naku","Evening cicadas sing"],
  [8,18,"蒙霧升降","Fukaki kiri matō","Thick fog descends"],
  [8,23,"綿柎開","Wata no hana shibe hiraku","Cotton bolls open"],
  [8,28,"天地始粛","Tenchi hajimete samushi","Heat starts to die down"],
  [9,2,"禾乃登","Kokumono sunawachi minoru","Rice ripens"],
  [9,8,"草露白","Kusa no tsuyu shiroshi","Dew glistens white on grass"],
  [9,13,"鶺鴒鳴","Sekirei naku","Wagtails sing"],
  [9,18,"玄鳥去","Tsubame saru","Swallows leave"],
  [9,23,"雷乃収声","Kaminari sunawachi koe o osamu","Thunder ceases"],
  [9,28,"蟄虫坏戸","Mushi kakurete to o fusagu","Insects hole up underground"],
  [10,3,"水始涸","Mizu hajimete karuru","Fields are drained"],
  [10,8,"鴻雁来","Kōgan kitaru","Wild geese return"],
  [10,13,"菊花開","Kiku no hana hiraku","Chrysanthemums bloom"],
  [10,18,"蟋蟀在戸","Kirigirisu to ni ari","Crickets chirp by the door"],
  [10,23,"霜始降","Shimo hajimete furu","First frost"],
  [10,28,"霎時施","Kosame tokidoki furu","Light rains sometimes fall"],
  [11,2,"楓蔦黄","Momiji tsuta kibamu","Maple and ivy turn yellow"],
  [11,7,"山茶始開","Tsubaki hajimete hiraku","Camellias bloom"],
  [11,12,"地始凍","Chi hajimete kōru","Land starts to freeze"],
  [11,17,"金盞香","Kinsenka saku","Daffodils bloom"],
  [11,22,"虹蔵不見","Niji kakurete miezu","Rainbows hide"],
  [11,27,"朔風払葉","Kitakaze konoha o harau","North wind strips the leaves"],
  [12,2,"橘始黄","Tachibana hajimete kibamu","Tachibana citrus turns yellow"],
  [12,7,"閉塞成冬","Sora samuku fuyu to naru","Cold sets in, winter begins"],
  [12,12,"熊蟄穴","Kuma ana ni komoru","Bears start hibernating"],
  [12,16,"鱖魚群","Sake no uo muragaru","Salmon gather upstream"],
  [12,21,"乃東生","Natsukarekusa shōzu","Self-heal sprouts"],
  [12,26,"麋角解","Sawashika no tsuno otsuru","Deer shed their antlers"],
  [12,31,"雪下出麦","Yuki watarite mugi nobiru","Wheat sprouts under snow"],
  [1,5,"芹乃栄","Seri sunawachi sakau","Parsley flourishes"],
  [1,10,"水泉動","Shimizu atataka o fukumu","Springs thaw"],
  [1,15,"雉始雊","Kiji hajimete naku","Pheasants start to call"],
  [1,20,"款冬華","Fuki no hana saku","Butterburs bud"],
  [1,25,"水沢腹堅","Sawamizu kōri tsumeru","Ice thickens on streams"],
  [1,30,"鶏始乳","Niwatori hajimete toya ni tsuku","Hens start laying eggs"]
];

// [kanji, romaji, english] for the 24 major seasons
const SEKKI = [
  ["立春","Risshun","Beginning of spring"],["雨水","Usui","Rainwater"],["啓蟄","Keichitsu","Insects awaken"],
  ["春分","Shunbun","Spring equinox"],["清明","Seimei","Pure and clear"],["穀雨","Kokuu","Grain rain"],
  ["立夏","Rikka","Beginning of summer"],["小満","Shōman","Lesser ripening"],["芒種","Bōshu","Grain in ear"],
  ["夏至","Geshi","Summer solstice"],["小暑","Shōsho","Lesser heat"],["大暑","Taisho","Greater heat"],
  ["立秋","Risshū","Beginning of autumn"],["処暑","Shosho","End of heat"],["白露","Hakuro","White dew"],
  ["秋分","Shūbun","Autumn equinox"],["寒露","Kanro","Cold dew"],["霜降","Sōkō","Frost falls"],
  ["立冬","Rittō","Beginning of winter"],["小雪","Shōsetsu","Lesser snow"],["大雪","Taisetsu","Greater snow"],
  ["冬至","Tōji","Winter solstice"],["小寒","Shōkan","Lesser cold"],["大寒","Daikan","Greater cold"]
];

// Six daily cues per micro-season. Day 6 is used only in six-day seasons.
const CUES = [
  ["Open a window for ten minutes. Let fresh air in.", "Notice the light lasts a little longer this evening.", "Eat something with citrus to wake up your senses.", "Write down one thing you want to start this spring.", "Take a short walk at noon, the warmest part of the day.", "Swap one heavy blanket for a lighter one."],
  ["Step outside early and listen for birdsong.", "Sing along to one song you love.", "Notice which birds visit your street.", "Eat a light breakfast and get moving early.", "Call a friend just to say hello.", "Take a walk without headphones."],
  ["Start one thing you put off all winter.", "Stretch for five minutes after you wake up.", "Eat fish or something fresh and light tonight.", "Clear one cluttered surface in your home.", "Notice frost giving way to water in the morning.", "Reply to the message you have been avoiding."],
  ["Water your plants and check their soil.", "Start a few seeds indoors on a sunny sill.", "Listen to the rain for five minutes, doing nothing else.", "Make a warm soup with greens.", "Smell the air after it rains.", "Drink a glass of water before your coffee."],
  ["Hazy mornings suit a slow start. Skip the rush.", "Notice how mist softens the shapes of things.", "Make tea and drink it before checking your phone.", "Leave ten minutes early and walk slower.", "Do one task at a time today.", "Look at the horizon for a minute. Rest your eyes."],
  ["Look closely at bare branches. Buds are swelling.", "Eat sprouts or fresh greens today.", "Find one patch of new green on your walk.", "Plan something to look forward to this month.", "Stand on grass or soil for a minute.", "Repot or refresh one plant."],
  ["Clear out one closet. Everything is waking up.", "Take a longer walk than usual.", "Notice the first bees out in the sun.", "Open every window and air out your home.", "Try a new route to somewhere familiar.", "Donate three things you did not use this winter."],
  ["Bring a few flowering branches indoors.", "Notice pink blossoms on your street.", "Eat fresh strawberries.", "Smile at a stranger today.", "Wear something soft pink or light.", "Take a close-up photo of one blossom."],
  ["Try one small change in your routine.", "Look for butterflies in a sunny spot.", "Learn one new thing for ten minutes.", "Rearrange one corner of your room.", "Cook a meal you have never made before.", "Write down how you have changed since last spring."],
  ["Tidy your space until it feels like a nest.", "Notice birds carrying twigs and grass.", "Wash your sheets and make your bed with care.", "Cook at home and eat slowly.", "Add one plant or flower to your room.", "Spend an evening at home with no plans."],
  ["Take lunch outside under a blooming tree.", "Walk a route with blossoms on the way.", "Look up. Notice petals against the sky.", "Share something sweet with a friend.", "Sit outside for fifteen minutes, phone away.", "Petals are starting to fall. Enjoy them now."],
  ["Spring storms bring the first thunder of the year.", "Keep an umbrella by the door.", "On a rainy evening, read something you love.", "Count the seconds between lightning and thunder.", "Make a cozy dinner and light a candle.", "Unplug for an hour this evening."],
  ["Reach out to someone you have not seen in a while.", "Watch for swallows darting low over open ground.", "Return something you borrowed.", "Revisit a favorite place you have missed.", "Eat a meal outdoors.", "Send a short thank-you note."],
  ["Let go of one winter habit you no longer need.", "Look up for birds flying in formation.", "Put away your heaviest coat.", "Plan a trip, even a small one.", "Walk somewhere new in your neighborhood.", "Say yes to one invitation."],
  ["After rain, look for a rainbow opposite the sun.", "Eat a meal with as many colors as you can.", "Wear your brightest color.", "Notice light breaking through a glass of water.", "Do something kind for no reason.", "Take a slow walk after the rain."],
  ["Walk near water. New green is rising at the edges.", "Eat spring greens like peas or asparagus.", "Notice how tall the grass has grown.", "Start a small daily habit and keep it simple.", "Drink more water today.", "Sit by water and listen for a few minutes."],
  ["Frost is done. Plant what you have been saving.", "Start a herb pot on your windowsill.", "Eat a bowl of rice with spring vegetables.", "Notice seedlings in gardens and planters.", "Give one idea of yours time to grow today.", "Spend an hour working with your hands."],
  ["Buy yourself flowers. Peonies are at their peak.", "Notice big blooms in gardens and shop windows.", "Dress up a little for no reason.", "Treat yourself to a slow, generous meal.", "Give flowers to someone.", "Take a long bath and take your time."],
  ["Take an evening walk and listen to the night.", "Notice the sounds after dark.", "Eat dinner outside if it is warm enough.", "Enjoy the long evening light.", "Sing in the shower.", "Visit a pond or creek."],
  ["The soil is warm and alive. A good week to garden.", "Put your hands in soil, even a pot of it.", "Save food scraps for compost.", "Notice the smell of earth after watering.", "Eat root vegetables, roasted simply.", "Weed one small patch."],
  ["Spring vegetables are at their best. Eat green.", "Notice how fast everything is growing now.", "Stretch tall for five minutes this morning.", "Try a dish with bamboo shoots.", "Push one project forward a little.", "Stand up straight and take three deep breaths."],
  ["Days are long and busy. Eat well and fuel up.", "Eat berries today.", "Pack a proper lunch instead of grabbing one.", "Notice how green the trees have become.", "Rest for ten quiet minutes after lunch.", "Cook a big meal and save some for tomorrow."],
  ["Wear a bright color today.", "Notice yellow and orange flowers on your walk.", "Add something red or orange to your meal.", "Make something creative, even something small.", "Send a friend a photo of something beautiful.", "Paint or draw for fifteen minutes."],
  ["Look back at what spring grew. Write down one win.", "Eat fresh bread.", "Notice golden fields or drying grass.", "Finish one task you started this spring.", "Thank someone who helped you this season.", "Clean up your workspace for summer."],
  ["Early summer. Pace yourself before the heat.", "Notice small insects in the garden.", "Pause before you react today.", "Eat light, cool food.", "Keep still for five minutes and just watch.", "Move your workout to the cool of the morning."],
  ["Stay out after dusk once this week.", "Notice the first lights coming on at dusk.", "Turn off screens an hour before bed.", "Eat dinner by candlelight.", "Take a night walk with a friend.", "Look at the stars for five minutes."],
  ["Stone fruit is ripening. Eat it at its best.", "Eat fruit with yogurt for breakfast.", "Notice the scent of ripe fruit at the market.", "Keep an umbrella close for summer showers.", "Make a cold drink with fresh fruit.", "Share fruit with a neighbor or coworker."],
  ["The longest days. Use the late light for a walk.", "Watch the sunset all the way to the end.", "Notice how late the sky stays bright.", "Take a long lunch outside.", "Check in on yourself. Rest if you need it.", "Eat corn or tomatoes while they are sweet."],
  ["Halfway through the year. Check in on one goal.", "Notice purple flowers on your walk.", "Clear your desk for the second half of the year.", "Plan one thing for the summer.", "Eat a cooling salad.", "Write three lines about the year so far."],
  ["Humid days ahead. Eat light and rest well.", "Take a short nap if you can.", "Drink something cool and unsweetened.", "Notice weeds pushing up through cracks.", "Keep your evening plans light.", "Air out your home in the cool morning."],
  ["Move workouts to early morning or evening.", "Feel the warm wind for a minute.", "Eat cold noodles or a chilled soup.", "Wear light, loose clothes.", "Drink water before you feel thirsty.", "Hang laundry out to dry in the warm air."],
  ["Lotus flowers open at dawn. Try waking with the sun.", "Sit quietly for five minutes this morning.", "Notice flowers floating on still water.", "Eat a light breakfast with fruit.", "Start the day before checking messages.", "Do one calm thing before work."],
  ["Practice something new, badly, and keep going.", "Watch birds circling on warm air.", "Try a skill you have been afraid to try.", "Ask someone to teach you something.", "Go somewhere high and look out.", "Encourage someone who is just starting out."],
  ["Seeds set now for next year. Plan one thing ahead.", "Notice seed pods forming on trees.", "Set aside a little money for later.", "Write down an idea for next year.", "Snack on seeds or nuts.", "Help someone get started on something."],
  ["Drink more water than you think you need.", "Eat watermelon or cucumber.", "Take a cool shower in the afternoon.", "Slow down in the heat. Do less.", "Find shade for your lunch break.", "Sleep with a window open if it is cool enough."],
  ["Summer storms clear the air. Expect slow days.", "Listen to rain on the roof.", "Keep a towel and umbrella ready.", "Spend a rainy afternoon on a book or film.", "Notice how fresh the air smells after a storm.", "Make a warm drink on a rainy evening."],
  ["Notice the first cool breeze of the evening.", "Take an evening walk as it cools down.", "Bring a light layer when you head out.", "Eat the last of summer's tomatoes.", "Open the windows at night.", "Reset one routine for the coming autumn."],
  ["Evenings are getting shorter. Sit outside tonight.", "Listen for insects buzzing at dusk.", "Watch the sun set a little earlier.", "Call someone you spent summer with.", "Eat a simple dinner outdoors.", "Write down a favorite summer memory."],
  ["Foggy mornings. Give yourself extra time.", "Notice how fog changes the sounds around you.", "Walk slower today.", "Make a warm breakfast.", "Take a quiet walk in the fog.", "Focus on what is close. Save the big picture for later."],
  ["Refresh your bedding for the cooler nights ahead.", "Notice soft textures around you.", "Wear something soft and comfortable.", "Fold a load of laundry slowly, with care.", "Care for your skin after the summer sun.", "Go to bed early tonight."],
  ["The heat is breaking. Ease back into longer walks.", "Notice the light sitting lower in the sky.", "Restart a routine you dropped in the heat.", "Eat late-summer peaches or plums.", "Plan your autumn weekends.", "Stretch for ten minutes in the evening."],
  ["Harvest season. Cook a simple bowl of fresh rice.", "Notice golden fields or yellowing grass.", "Eat a home-cooked meal with someone.", "Be grateful for one thing you worked for.", "Look at what you have finished this year.", "Share food with a neighbor."],
  ["Look for dew on the grass first thing in the morning.", "Step outside before breakfast.", "Add a warm layer for early mornings.", "Eat grapes or figs.", "Notice the cooler air on your face.", "Begin your day slowly with tea."],
  ["Walk somewhere near water today.", "Listen for birds near water.", "Notice small birds bobbing on the ground.", "Talk less and listen more today.", "Go outside on your lunch break.", "Hum a tune while you work."],
  ["Say goodbye to summer. Finish one summer plan.", "Notice fewer birds around as they head south.", "Pack away summer clothes.", "Write to someone far away.", "Eat the last of the summer fruit.", "Let go of one thing that has run its course."],
  ["Summer storms are done. The air turns still and clear.", "Look up at the clear autumn sky.", "Take a long walk on a calm day.", "Notice how quiet the evenings feel.", "Cook with seasonal mushrooms.", "Do one calm, focused task."],
  ["Start winding down a little earlier each evening.", "Notice fewer insects buzzing around.", "Set a regular bedtime this week.", "Get your home ready for the colder months.", "Eat warm, grounding food like sweet potatoes.", "Spend a quiet evening in."],
  ["Clear what is finished. Close one open loop.", "Clean out your fridge.", "Notice fields and gardens being cleared.", "Sip warm water or tea through the day.", "Clear your desktop and downloads folder.", "Cancel one subscription you no longer use."],
  ["Cooler nights. Bring out a warm layer.", "Look up for birds flying in V shapes.", "Reconnect with an old friend.", "Eat roasted squash or pumpkin.", "Return to a place that feels like home.", "Notice the earlier sunsets."],
  ["Autumn is at its peak. Plan a day outside.", "Notice chrysanthemums at markets and doorsteps.", "Bring a pot of flowers home.", "Eat apples or pears.", "Call an older relative or friend.", "Take a long walk and notice the colors."],
  ["Long nights begin. Read before bed instead of scrolling.", "Listen for crickets after dark.", "Light a candle in the evening.", "Make a warm drink before bed.", "Go to bed fifteen minutes earlier.", "Spend an evening on a hobby."],
  ["Mornings turn cold. Warm drinks, warm socks.", "Look for frost on cars and grass.", "Eat a hot breakfast.", "Bring out your winter coat.", "Eat citrus and dark greens.", "Stretch for a minute before you head out."],
  ["Soft rain days are good for slow, indoor work.", "Listen to light rain.", "Pack a small umbrella in your bag.", "Make a pot of soup.", "Visit a café or library on a rainy day.", "Notice wet leaves on the ground."],
  ["Go see the leaves before they fall.", "Pick up one beautiful leaf.", "Notice ivy turning red on walls.", "Eat roasted chestnuts or nuts.", "Take photos of autumn colors.", "Walk through a park slowly."],
  ["Bright flowers in a gray month. Find one on your walk.", "Notice camellias and their glossy leaves.", "Wear a bright color on a gray day.", "Drink a warm tea in the afternoon.", "Send someone a kind note.", "Add a small flower to your desk."],
  ["Eat warming food. Soups and root vegetables.", "Notice how cold the ground feels in the morning.", "Wear an extra layer outside.", "Take a hot bath tonight.", "Seal one drafty window or door.", "Stay in and cook something slow."],
  ["Look for flowers still blooming in the cold.", "Go to bed a little earlier tonight.", "Eat something warm with ginger.", "Put fresh flowers on your table.", "Notice which plants stay green in winter.", "Spend a slow evening at home."],
  ["The light is low and soft. Get outside at midday.", "Notice how long your shadow is at noon.", "Eat citrus for a bit of sunshine.", "Turn on warm lights in the evening.", "Sit by a sunny window for ten minutes.", "Keep your evening calm and simple."],
  ["Bare trees ahead. Look up at the shapes of branches.", "Wrap up warm against the wind.", "Sweep up fallen leaves.", "Eat a hearty stew.", "Notice which trees are already bare.", "Let go of one thing you are holding on to."],
  ["Citrus season. Eat an orange in the sun.", "Notice citrus piled up at the market.", "Add lemon or yuzu to hot water.", "Bring brightness in with a yellow flower.", "Share a bag of oranges with someone.", "Take a short walk in the afternoon sun."],
  ["Winter is here. Make your space warm and soft.", "Bring out blankets and warm socks.", "Eat a warm bowl of noodles.", "Notice your breath in the cold air.", "Switch to warm, low lights after dark.", "Plan a cozy weekend."],
  ["Rest more. Say no to one plan this week.", "Sleep in if you can.", "Make a big pot of soup to last a few days.", "Stay in and read.", "Take a nap without guilt.", "Keep your evening free."],
  ["Gather with people. Plan one meal together.", "Eat salmon or another oily fish.", "Call family or old friends.", "Notice the energy of the holiday season.", "Help someone with something heavy.", "Go back to a place that feels like home."],
  ["The shortest day. From here, the light returns.", "Watch the early sunset and light a candle.", "Eat a warm squash or pumpkin dish.", "Take a hot bath with something fragrant.", "Write down what you want to grow next year.", "Notice the days slowly getting longer."],
  ["Shed one thing before the new year.", "Clean out one drawer.", "Rest. Do less this week.", "Eat simple, nourishing food.", "Forgive yourself for one thing this year.", "Notice how quiet everything is in winter."],
  ["Set one quiet intention for the year ahead.", "Write down three good things from this year.", "Eat something with whole grains.", "Start something small that will grow slowly.", "Take a walk on the first day of the year.", "Plan your first week gently."],
  ["Eat greens to reset after the holidays.", "Drink more water than usual today.", "Make a fresh herb soup.", "Go for a brisk walk.", "Notice green plants thriving in the cold.", "Start the year with one small healthy habit."],
  ["Small steps count. Start one tiny habit.", "Drink warm water when you wake up.", "Notice moving water on your walk.", "Loosen up with a long stretch.", "Make progress on one stuck thing.", "Be patient with slow progress."],
  ["Say what you want out loud to someone.", "Speak up in one conversation today.", "Notice birds calling in the morning.", "Call someone instead of texting.", "Eat a warm breakfast with protein.", "Share an idea you have been sitting on."],
  ["The coldest days. Stay warm and move a little daily.", "Notice the first buds pushing through cold ground.", "Eat bitter greens like kale or broccoli rabe.", "Do ten minutes of exercise indoors.", "Keep your hands and feet warm.", "Look for small signs of spring."],
  ["Deep winter is good for focused work.", "Pick one task and give it two quiet hours.", "Eat a hot, slow-cooked meal.", "Notice ice or frost in the early morning.", "Keep your evenings calm and early.", "Read something long and slow."],
  ["Spring is close. Plan what you will start.", "Eat eggs for breakfast.", "Notice the light lasting longer each day.", "Clean your space before spring.", "Make a list of things to try this spring.", "Get some fresh air at midday."]
];

// ---------- palette ----------
// Deep season colors. Each day blends a little from one season toward the next.
// [top of gradient, bottom of gradient, botanical tint, accent]
const PALETTE = [
  ["#8A4660", "#4F2235", "#F0B9C8", "#F6CDD8"], // spring: plum rose
  ["#3E6347", "#1F3526", "#B9D6B0", "#D2E6C9"], // summer: forest
  ["#9A5430", "#5A2A14", "#F0C29A", "#F6D5B5"], // autumn: rust
  ["#34506B", "#1B2A3B", "#AFC6DB", "#C9DAEA"]  // winter: ink blue
];
const INK = "#F3EEE4";
const MINCHO = "HiraMinProN-W3", SERIF_I = "Georgia-Italic";

// ---------- dates ----------
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const MS = 864e5;
const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmt = d => MON[d.getMonth()] + " " + d.getDate();

const starts = [];
for (const y of [today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1])
  KO.forEach((k, i) => starts.push({ i, t: new Date(y, k[0] - 1, k[1]) }));
starts.sort((a, b) => a.t - b.t);
let at = 0;
for (let j = 0; j < starts.length; j++) { if (starts[j].t <= today) at = j; else break; }

const cur = starts[at].i, NO = cur + 1, k = KO[cur];
const sek = SEKKI[Math.floor(cur / 3)];
const start = starts[at].t, end = starts[at + 1].t;
const length = Math.round((end - start) / MS);
const day = Math.round((today - start) / MS) + 1;
const cue = CUES[cur][Math.min(day, 6) - 1];
const nx = { ko: KO[starts[at + 1].i], t: starts[at + 1].t };

// ---------- color ----------
const hex2 = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16));
const mix = (a, b, t) => { const A = hex2(a), B = hex2(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
// Position in the year from 0 to 4, one unit per season of 18 micro-seasons.
const pos = (cur + (day - 1) / length) / 18;
// Each season holds its own color for its first two thirds, then eases into
// the next over its last third (about a month), so colors never turn muddy.
const sIdx = Math.floor(pos) % 4, inSeason = pos - Math.floor(pos);
const ease = t => t * t * (3 - 2 * t);
const frac = inSeason < 2 / 3 ? 0 : ease((inSeason - 2 / 3) * 3);
const P0 = PALETTE[sIdx], P1 = PALETTE[(sIdx + 1) % 4];
const TOP = mix(P0[0], P1[0], frac), BOT = mix(P0[1], P1[1], frac);
const LIGHT = mix(P0[2], P1[2], frac), accent = mix(P0[3], P1[3], frac);
const col = (hex, a) => new Color(hex, a === undefined ? 1 : a);
function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ---------- drawing helpers ----------
function text(ctx, s, x, y, w, h, font, color, align) {
  ctx.setFont(font); ctx.setTextColor(color);
  if (align === "center") ctx.setTextAlignedCenter();
  else if (align === "right") ctx.setTextAlignedRight();
  else ctx.setTextAlignedLeft();
  ctx.drawTextInRect(s, new Rect(x, y, w, h));
}
function dot(ctx, cx, cy, r, c) { ctx.setFillColor(c); ctx.fillEllipse(new Rect(cx - r, cy - r, r * 2, r * 2)); }
function ring(ctx, cx, cy, r, c) { ctx.setStrokeColor(c); ctx.setLineWidth(1); ctx.strokeEllipse(new Rect(cx - r, cy - r, r * 2, r * 2)); }
function line(ctx, x1, y1, x2, y2, c, w) {
  const p = new Path(); p.move(new Point(x1, y1)); p.addLine(new Point(x2, y2));
  ctx.addPath(p); ctx.setStrokeColor(c); ctx.setLineWidth(w); ctx.strokePath();
}
function dayDots(ctx, x, cy, gap) {
  for (let i = 0; i < length; i++) {
    const cx = x + i * gap;
    if (i + 1 < day) dot(ctx, cx, cy, 2.6, col(INK, 0.55));
    else if (i + 1 === day) dot(ctx, cx, cy, 3.4, col(accent));
    else ring(ctx, cx, cy, 2.6, col(INK, 0.6));
  }
  return x + (length - 1) * gap;
}

// Background: diagonal gradient from TOP to BOT, then fine grain.
function background(ctx, W, H) {
  const steps = 60;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    ctx.setFillColor(col(mix(TOP, BOT, t)));
    // Bands run diagonally: each one is a tall parallelogram strip.
    const p = new Path(), x0 = -H + (W + H) * i / steps, x1 = -H + (W + H) * (i + 1) / steps + 1;
    p.move(new Point(x0, 0)); p.addLine(new Point(x1, 0)); p.addLine(new Point(x1 + H * 0.8, H)); p.addLine(new Point(x0 + H * 0.8, H));
    ctx.addPath(p); ctx.fillPath();
  }
  const r = rng(cur * 97 + 13), n = Math.round(W * H / 9);
  for (let i = 0; i < n; i++) {
    const light = r() < 0.5;
    ctx.setFillColor(col(light ? "#FFFFFF" : "#000000", 0.035 + r() * 0.05));
    ctx.fillRect(new Rect(r() * W, r() * H, 0.7, 0.7));
  }
}

// Botanical branch that bleeds off a corner. Shape changes every micro-season,
// style follows the season: blossoms, leaves, autumn leaves or bare buds.
function leaf(ctx, x, y, ang, len, c) {
  const tx = x + Math.cos(ang) * len, ty = y + Math.sin(ang) * len, w = len * 0.42;
  const nx = Math.cos(ang + Math.PI / 2) * w, ny = Math.sin(ang + Math.PI / 2) * w;
  const mx = (x + tx) / 2, my = (y + ty) / 2;
  const p = new Path(); p.move(new Point(x, y));
  p.addQuadCurve(new Point(tx, ty), new Point(mx + nx, my + ny));
  p.addQuadCurve(new Point(x, y), new Point(mx - nx, my - ny));
  ctx.addPath(p); ctx.setFillColor(c); ctx.fillPath();
}
function branch(ctx, ox, oy, sc, ang0, strength) {
  const k = strength || 1;
  const r = rng(cur * 31 + 7);
  const stem = col(LIGHT, 0.2 * k), petal = col(LIGHT, 0.3 * k);
  const style = sIdx; // current season
  function limb(px, py, ang, len, wd, depth) {
    if (depth === 0 || len < 6) return;
    const ex = px + Math.cos(ang) * len, ey = py + Math.sin(ang) * len;
    const cx = px + Math.cos(ang + 0.3) * len * 0.5, cy = py + Math.sin(ang + 0.3) * len * 0.5;
    const p = new Path(); p.move(new Point(ox + px * sc, oy + py * sc));
    p.addQuadCurve(new Point(ox + ex * sc, oy + ey * sc), new Point(ox + cx * sc, oy + cy * sc));
    ctx.addPath(p); ctx.setStrokeColor(stem); ctx.setLineWidth(wd * sc); ctx.strokePath();
    const n = 2 + Math.floor(r() * 2);
    for (let i = 0; i < n; i++) {
      const t = 0.35 + r() * 0.6;
      limb(px + (ex - px) * t, py + (ey - py) * t, ang + (r() - 0.5) * 1.6, len * (0.45 + r() * 0.25), wd * 0.62, depth - 1);
    }
    if (depth > 2) return;
    const X = ox + ex * sc, Y = oy + ey * sc;
    if (style === 0) { // spring blossoms
      for (let i = 0; i < 2; i++) {
        const fx = X + (r() - 0.5) * 10 * sc, fy = Y + (r() - 0.5) * 10 * sc, fr = (2.6 + r() * 2) * sc;
        for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 + r(); dot(ctx, fx + Math.cos(a) * fr * 0.75, fy + Math.sin(a) * fr * 0.75, fr * 0.62, petal); }
        dot(ctx, fx, fy, fr * 0.3, stem);
      }
    } else if (style === 1) { // summer leaves
      for (let i = 0; i < 2; i++) leaf(ctx, X, Y, ang + (r() - 0.5) * 2.2, (9 + r() * 6) * sc, col(LIGHT, 0.26));
    } else if (style === 2) { // autumn leaves, a few falling
      leaf(ctx, X, Y, ang + (r() - 0.5) * 2, (8 + r() * 5) * sc, col(LIGHT, 0.3));
      if (r() < 0.4) leaf(ctx, X - 14 * sc, Y + 16 * sc, r() * 6, 6 * sc, col(LIGHT, 0.24));
    } else { // winter buds
      dot(ctx, X, Y, 1.7 * sc, col(LIGHT, 0.32));
    }
  }
  limb(0, 0, ang0, 70, 4.5, 5);
}

// Scriptable cannot measure text, so these estimate width from character count
// and simulate word wrapping.
const est = (s, size, f) => s.length * size * f;
function wrapLines(s, size, w, f) {
  let n = 1, cur = 0;
  for (const word of s.split(" ")) {
    const ww = est(word, size, f), add = cur ? ww + size * f : ww;
    if (cur + add > w && cur) { n++; cur = ww; } else cur += add;
  }
  return n;
}
const SERIF_F = 0.55, SANS_F = 0.5, CAPS_F = 0.58;
// Shrink a title until its longest word fits on one line.
function fitWord(s, size, w, min) {
  const longest = s.split(" ").reduce((a, b) => (b.length > a.length ? b : a), "");
  while (size > min && est(longest, size, 0.6) > w) size -= 0.5;
  return size;
}

// ---------- layouts ----------
function small(ctx, W, H) {
  background(ctx, W, H);
  branch(ctx, W + 10, H - 4, 0.66, -Math.PI * 0.8);
  const P = 14, w = W - 2 * P, bottom = H - P - 12;
  let y = P - 2;
  const lab = sek[2].toUpperCase();
  const ln = wrapLines(lab, 8, w, CAPS_F) > 1 ? 2 : 1;
  text(ctx, lab, P, y, w, ln * 11 + 3, Font.semiboldSystemFont(8), col(accent));
  y += ln * 11 + 4;
  let ts = fitWord(k[4], 16, w, 12), tl = wrapLines(k[4], ts, w, SERIF_F);
  if (tl > 2) { ts = Math.min(ts, 14.5); tl = Math.min(3, wrapLines(k[4], ts, w, SERIF_F)); }
  text(ctx, k[4], P, y, w, tl * ts * 1.24 + 4, new Font(SERIF_I, ts), col(INK));
  y += tl * ts * 1.24 + 5;
  const cl = Math.max(1, Math.min(3, Math.floor((bottom - y) / 12.4)));
  text(ctx, cue, P, y, w, cl * 12.4 + 2, Font.systemFont(10), col(INK, 0.86));
  dayDots(ctx, P + 3, H - P - 3, 9);
  text(ctx, "No. " + NO, W - P - 50, H - P - 10, 50, 14, Font.mediumSystemFont(9), col(INK, 0.72), "right");
}

function medium(ctx, W, H) {
  background(ctx, W, H);
  branch(ctx, W + 8, H + 10, 0.9, -Math.PI * 0.76);
  const P = 16, colW = 64;
  const chars = [...sek[0]], size = 30;
  const top = (H - chars.length * size * 1.18) / 2;
  chars.forEach((ch, i) => text(ctx, ch, P, top + i * size * 1.18, colW - 12, size * 1.4, new Font(MINCHO, size), col(INK), "center"));
  line(ctx, P + colW, P, P + colW, H - P, col(accent, 0.55), 0.8);
  const x = P + colW + 16, w = W - x - P;
  text(ctx, NO + " of 72", W - P - 56, P - 2, 56, 14, Font.mediumSystemFont(9), col(INK, 0.72), "right");
  text(ctx, sek[2].toUpperCase(), x, P - 2, w - 62, 14, Font.semiboldSystemFont(8.5), col(accent));
  let ts = fitWord(k[4], 19, w, 14), tl = wrapLines(k[4], ts, w, SERIF_F);
  if (tl > 2) { ts = Math.min(ts, 17); tl = Math.min(2, wrapLines(k[4], ts, w, SERIF_F)); }
  text(ctx, k[4], x, P + 14, w, tl * ts * 1.24 + 4, new Font(SERIF_I, ts), col(INK));
  const cy = P + 20 + tl * ts * 1.24;
  text(ctx, cue, x, cy, w, 28, Font.systemFont(11), col(INK, 0.88));
  const endX = dayDots(ctx, x + 3, H - P - 4, 10);
  const room = W - P - endX - 12;
  let s = "Next: " + fmt(nx.t) + "  " + nx.ko[4];
  let fs = 9.5;
  while (fs > 8 && est(s, fs, SANS_F) > room) fs -= 0.5;
  if (est(s, fs, SANS_F) > room) s = "Next: " + fmt(nx.t);
  text(ctx, s, endX + 12, H - P - 11, room, 14, Font.systemFont(fs), col(INK, 0.72));
}


// ---------- large ----------
const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function koOn(d) {
  let j = 0;
  for (let n = 0; n < starts.length; n++) { if (starts[n].t <= d) j = n; else break; }
  const len = Math.round((starts[j + 1].t - starts[j].t) / MS);
  const dd = Math.round((d - starts[j].t) / MS) + 1;
  return { j, i: starts[j].i, cue: CUES[starts[j].i][Math.min(dd, 6) - 1], start: starts[j].t, len };
}
function large(ctx, W, H) {
  background(ctx, W, H);
  branch(ctx, W + 16, H + 22, 1.15, -Math.PI * 0.72, 0.6);
  const P = 18, colW = 64;
  const X = P + colW + 16, w = W - X - P;
  const bottom = H - P;

  // Right column: header
  text(ctx, NO + " of 72", W - P - 56, P - 2, 56, 14, Font.mediumSystemFont(9), col(INK, 0.72), "right");
  text(ctx, sek[2].toUpperCase(), X, P - 2, w - 62, 14, Font.semiboldSystemFont(8.5), col(accent));
  let ts = fitWord(k[4], 21, w, 15), tl = wrapLines(k[4], ts, w, SERIF_F);
  if (tl > 2) { ts = Math.min(ts, 18); tl = 2; }
  text(ctx, k[4], X, P + 13, w, tl * ts * 1.22 + 4, new Font(SERIF_I, ts), col(INK));
  let y = P + 15 + tl * ts * 1.22;
  const cl = Math.min(2, wrapLines(cue, 12.5, w, SANS_F));
  text(ctx, cue, X, y, w, cl * 16 + 2, Font.systemFont(12.5), col(INK, 0.88));
  y += cl * 16 + 10;
  const endX = dayDots(ctx, X + 3, y, 10);
  text(ctx, "Day " + day + " of " + length, endX + 12, y - 7, 120, 14, Font.systemFont(9.5), col(INK, 0.72));
  y += 14;
  line(ctx, X, y, X + w, y, col(INK, 0.18), 0.8);
  y += 10;

  // Coming up: next three days, with a divider where a new micro-season starts
  const nextTop = bottom + 6; // lowest the list may reach
  text(ctx, "COMING UP", X, y, w, 12, Font.semiboldSystemFont(8), col(INK, 0.6));
  y += 16;
  let prevJ = at;
  for (let d = 1; d <= 3; d++) {
    const date = new Date(today.getTime() + d * MS);
    const info = koOn(date);
    if (info.j !== prevJ) {
      if (y + 15 > nextTop - 8) break;
      const lab = fmt(info.start) + "  ·  " + KO[info.i][4];
      line(ctx, X, y + 6, X + 8, y + 6, col(accent, 0.55), 0.8);
      text(ctx, lab, X + 13, y, w - 13, 13, Font.mediumSystemFont(8.5), col(accent));
      const lw = Math.min(w - 13, est(lab, 8.5, 0.52) + 6);
      if (X + 13 + lw < X + w - 4) line(ctx, X + 13 + lw, y + 6, X + w, y + 6, col(accent, 0.55), 0.8);
      y += 15; prevJ = info.j;
    }
    const lines = Math.min(2, wrapLines(info.cue, 10.5, w - 52, SANS_F));
    if (y + lines * 13.5 > nextTop - 6) break;
    text(ctx, d === 1 ? "Tomorrow" : WEEK[date.getDay()], X, y + 1, 50, 13, Font.mediumSystemFont(9.5), col(INK, 0.6));
    text(ctx, info.cue, X + 52, y, w - 52, lines * 13.5 + 2, Font.systemFont(10.5), col(INK, 0.86));
    y += lines * 13.5 + 7;
  }

  // Left column: current major season
  [...sek[0]].forEach((ch, i) => text(ctx, ch, P, P + 2 + i * 40, colW - 12, 46, new Font(MINCHO, 34), col(INK), "center"));
  line(ctx, P + colW, P, P + colW, H - P, col(accent, 0.55), 0.8);
}

// ---------- build ----------
const fam = config.widgetFamily || "medium";
const w = new ListWidget();
w.refreshAfterDate = new Date(today.getTime() + MS + 60 * 1000);

if (fam === "accessoryInline") {
  w.addText(k[4] + " · " + NO + "/72");
} else if (fam === "accessoryRectangular") {
  const a = w.addText(sek[2] + " · " + NO + "/72"); a.font = Font.semiboldSystemFont(11); a.textOpacity = 0.7; a.lineLimit = 1;
  const b = w.addText(k[4]); b.font = Font.semiboldSystemFont(14); b.lineLimit = 1; b.minimumScaleFactor = 0.75;
  const c = w.addText(cue); c.font = Font.systemFont(11); c.lineLimit = 2; c.minimumScaleFactor = 0.85;
} else {
  const W = fam === "small" ? 155 : 329, H = fam === "large" || fam === "extraLarge" ? 345 : 155;
  const ctx = new DrawContext();
  ctx.size = new Size(W, H); ctx.opaque = false; ctx.respectScreenScale = true;
  if (fam === "small") small(ctx, W, H); else if (H > 155) large(ctx, W, H); else medium(ctx, W, H);
  w.backgroundColor = col(BOT);
  w.setPadding(0, 0, 0, 0);
  w.backgroundImage = ctx.getImage();
}

if (config.runsInWidget) Script.setWidget(w);
else await w.presentMedium();
Script.complete();

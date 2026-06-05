export interface Exercise {
  id: number;
  name: string;
  muscle: string;
  type: string;
  equip: string;
  emoji: string;
  gifKey: string;
  cues: string[];
}

export const EXERCISES: Exercise[] = [
  /* ── CHEST ── */
  {id:1, name:'Barbell Bench Press', muscle:'Chest', type:'Compound', equip:'Barbell', emoji:'🏋️', gifKey:'barbell bench press', cues:['Retract shoulder blades into bench','Lower bar to mid-chest with control','Drive through heels as you press','Full lockout at top']},
  {id:2, name:'Incline Barbell Press', muscle:'Chest', type:'Compound', equip:'Barbell', emoji:'📐', gifKey:'incline barbell bench press', cues:['Set bench to 30-45 degrees','Bar path to upper chest','Keep elbows at 45 degrees','Squeeze chest at top']},
  {id:3, name:'Dumbbell Bench Press', muscle:'Chest', type:'Compound', equip:'Dumbbell', emoji:'💪', gifKey:'dumbbell bench press', cues:['Press dumbbells together at top','Full range of motion','Keep wrists neutral','Control the descent']},
  {id:4, name:'Incline Dumbbell Press', muscle:'Chest', type:'Compound', equip:'Dumbbell', emoji:'📐', gifKey:'incline dumbbell press', cues:['Bench at 30-45 degrees','Bring dumbbells to upper chest','Press up and in','Feel the upper chest stretch']},
  {id:5, name:'Cable Fly', muscle:'Chest', type:'Isolation', equip:'Cable', emoji:'🔄', gifKey:'cable crossover', cues:['Keep slight bend in elbows','Bring handles together in arc','Feel the chest stretch','Squeeze at peak contraction']},
  {id:6, name:'Dumbbell Fly', muscle:'Chest', type:'Isolation', equip:'Dumbbell', emoji:'🦋', gifKey:'dumbbell fly', cues:['Wide arc motion','Slight bend in elbows throughout','Stretch chest at bottom','Squeeze at top']},
  {id:7, name:'Push-Ups', muscle:'Chest', type:'Compound', equip:'Bodyweight', emoji:'🤸', gifKey:'push up', cues:['Body in straight line','Hands slightly wider than shoulders','Chest touches floor','Full arm extension at top']},
  {id:8, name:'Weighted Dips', muscle:'Chest', type:'Compound', equip:'Bodyweight', emoji:'⬇️', gifKey:'chest dip', cues:['Lean forward for chest focus','Lower until shoulders below elbows','Drive up through palms','Control the descent']},
  {id:9, name:'Pec Deck Fly', muscle:'Chest', type:'Isolation', equip:'Machine', emoji:'🦋', gifKey:'pec deck fly', cues:['Adjust seat so handles at chest','Keep slight bend in arms','Squeeze chest at peak','Slow controlled return']},
  {id:10, name:'Decline Bench Press', muscle:'Chest', type:'Compound', equip:'Barbell', emoji:'📉', gifKey:'decline barbell bench press', cues:['Targets lower chest','Bar to lower pecs','Keep feet locked in','Control the bar path']},

  /* ── BACK ── */
  {id:11, name:'Pull-Ups', muscle:'Back', type:'Compound', equip:'Bodyweight', emoji:'🔝', gifKey:'pull up', cues:['Dead hang start position','Pull elbows to hips','Chin clears the bar','3-second descent']},
  {id:12, name:'Lat Pulldown', muscle:'Back', type:'Compound', equip:'Cable', emoji:'🔽', gifKey:'lat pulldown', cues:['Slight backward lean','Pull bar to upper chest','Squeeze lats at bottom','Controlled return']},
  {id:13, name:'Barbell Row', muscle:'Back', type:'Compound', equip:'Barbell', emoji:'🏋️', gifKey:'barbell bent over row', cues:['Hinge at hips to 45 degrees','Pull bar to lower chest','Drive elbows back','Keep back flat throughout']},
  {id:14, name:'Dumbbell Row', muscle:'Back', type:'Compound', equip:'Dumbbell', emoji:'💪', gifKey:'dumbbell one arm row', cues:['Knee and hand on bench','Pull elbow to ceiling','Rotate shoulder at top','Full stretch at bottom']},
  {id:15, name:'Seated Cable Row', muscle:'Back', type:'Compound', equip:'Cable', emoji:'🚣', gifKey:'seated cable row', cues:['Sit tall with slight forward lean','Pull handle to lower chest','Drive elbows back','Control return slowly']},
  {id:16, name:'Face Pull', muscle:'Back', type:'Isolation', equip:'Cable', emoji:'😤', gifKey:'face pull', cues:['Cable at forehead height','Pull to face with elbows high','External rotate at end','Pause at contraction']},
  {id:17, name:'T-Bar Row', muscle:'Back', type:'Compound', equip:'Barbell', emoji:'🏋️', gifKey:'t bar row', cues:['Neutral spine throughout','Pull to lower chest','Squeeze shoulder blades','Control the weight down']},
  {id:18, name:'Chest-Supported Row', muscle:'Back', type:'Compound', equip:'Dumbbell', emoji:'🛋️', gifKey:'chest supported row', cues:['Chest flat on incline bench','Pull dumbbells to hips','Squeeze at top','Eliminate body English']},
  {id:19, name:'Straight-Arm Pulldown', muscle:'Back', type:'Isolation', equip:'Cable', emoji:'⬇️', gifKey:'straight arm pulldown', cues:['Slight bend in elbows locked','Push bar from forehead to thighs','Feel lats stretch at top','Squeeze at bottom']},
  {id:20, name:'Chin-Ups', muscle:'Back', type:'Compound', equip:'Bodyweight', emoji:'💪', gifKey:'chin up', cues:['Underhand grip shoulder width','Pull chest to bar','Biceps fully engaged','Full hang at bottom']},

  /* ── SHOULDERS ── */
  {id:21, name:'Overhead Press', muscle:'Shoulders', type:'Compound', equip:'Barbell', emoji:'⬆️', gifKey:'barbell shoulder press', cues:['Bar starts at chin level','Press straight up to full lockout','Head through at top','Control descent to clavicle']},
  {id:22, name:'Dumbbell Shoulder Press', muscle:'Shoulders', type:'Compound', equip:'Dumbbell', emoji:'💪', gifKey:'dumbbell shoulder press', cues:['Start at shoulder height','Press dumbbells up and slightly in','Full lockout at top','Lower with control']},
  {id:23, name:'Arnold Press', muscle:'Shoulders', type:'Compound', equip:'Dumbbell', emoji:'🔄', gifKey:'arnold press', cues:['Rotate palms as you press','Full range of motion','Front delts fully engaged','Slow rotation down']},
  {id:24, name:'Lateral Raise', muscle:'Shoulders', type:'Isolation', equip:'Dumbbell', emoji:'↔️', gifKey:'lateral raise', cues:['Lead with elbows not wrists','Raise to shoulder height only','Slight forward lean','3-second descent']},
  {id:25, name:'Front Raise', muscle:'Shoulders', type:'Isolation', equip:'Dumbbell', emoji:'⬆️', gifKey:'front raise', cues:['Raise to shoulder height','Keep slight bend in elbows','Alternate arms for control','No swinging']},
  {id:26, name:'Cable Lateral Raise', muscle:'Shoulders', type:'Isolation', equip:'Cable', emoji:'↔️', gifKey:'cable lateral raise', cues:['Cable at ankle height','Pull across body to shoulder height','Keep elbow slightly bent','Constant tension throughout']},
  {id:27, name:'Reverse Pec Deck', muscle:'Shoulders', type:'Isolation', equip:'Machine', emoji:'🔄', gifKey:'reverse pec deck fly', cues:['Targets rear delts','Arms parallel to floor','Squeeze rear delts at peak','Slow controlled return']},
  {id:28, name:'Upright Row', muscle:'Shoulders', type:'Compound', equip:'Barbell', emoji:'⬆️', gifKey:'barbell upright row', cues:['Close grip on bar','Lead with elbows','Pull to chin level','Elbows above wrists throughout']},
  {id:29, name:'Shrug', muscle:'Shoulders', type:'Isolation', equip:'Dumbbell', emoji:'🤷', gifKey:'dumbbell shrug', cues:['Straight up motion only','Hold at peak contraction','No rolling of shoulders','Full stretch at bottom']},

  /* ── ARMS - BICEPS ── */
  {id:30, name:'Barbell Curl', muscle:'Biceps', type:'Isolation', equip:'Barbell', emoji:'💪', gifKey:'barbell curl', cues:['Elbows pinned to sides','Curl to chin level','Squeeze at top','Slow 3-second descent']},
  {id:31, name:'Dumbbell Curl', muscle:'Biceps', type:'Isolation', equip:'Dumbbell', emoji:'💪', gifKey:'dumbbell curl', cues:['Alternate or together','Supinate wrist as you curl','Full range of motion','Control the negative']},
  {id:32, name:'Hammer Curl', muscle:'Biceps', type:'Isolation', equip:'Dumbbell', emoji:'🔨', gifKey:'hammer curl', cues:['Neutral grip throughout','Targets brachialis','Elbows stay at sides','Full extension at bottom']},
  {id:33, name:'Preacher Curl', muscle:'Biceps', type:'Isolation', equip:'Barbell', emoji:'🙏', gifKey:'barbell preacher curl', cues:['Arms flat on pad','Full stretch at bottom','Curl to chin','No swinging possible']},
  {id:34, name:'Concentration Curl', muscle:'Biceps', type:'Isolation', equip:'Dumbbell', emoji:'💪', gifKey:'concentration curl', cues:['Elbow braced on inner thigh','Full supination at top','Slow controlled movement','Maximum isolation']},
  {id:35, name:'Incline Dumbbell Curl', muscle:'Biceps', type:'Isolation', equip:'Dumbbell', emoji:'📐', gifKey:'incline dumbbell curl', cues:['Bench at 45-60 degrees','Arms hang behind body','Long head stretch','Curl up with full supination']},
  {id:36, name:'Cable Curl', muscle:'Biceps', type:'Isolation', equip:'Cable', emoji:'🔄', gifKey:'cable curl', cues:['Constant tension throughout','Keep elbows at sides','Squeeze hard at top','Control the negative']},
  {id:37, name:'EZ-Bar Curl', muscle:'Biceps', type:'Isolation', equip:'Barbell', emoji:'〽️', gifKey:'ez barbell curl', cues:['Angled grip reduces wrist strain','Elbows pinned to sides','Full curl to chin','Slow descent']},

  /* ── ARMS - TRICEPS ── */
  {id:38, name:'Skull Crushers', muscle:'Triceps', type:'Isolation', equip:'Barbell', emoji:'💀', gifKey:'ez barbell skullcrusher', cues:['Lower bar to forehead','Elbows pointed at ceiling','Extend to full lockout','Use moderate weight for safety']},
  {id:39, name:'Tricep Pushdown', muscle:'Triceps', type:'Isolation', equip:'Cable', emoji:'⬇️', gifKey:'cable tricep pushdown', cues:['Elbows pinned to sides','Full extension at bottom','Squeeze triceps hard','Control return to 90 degrees']},
  {id:40, name:'Overhead Tricep Extension', muscle:'Triceps', type:'Isolation', equip:'Dumbbell', emoji:'⬆️', gifKey:'dumbbell overhead tricep extension', cues:['Elbows close to head','Full stretch at bottom','Extend to lockout','Keep elbows stationary']},
  {id:41, name:'Tricep Dips', muscle:'Triceps', type:'Compound', equip:'Bodyweight', emoji:'⬇️', gifKey:'tricep dip', cues:['Upright torso for tricep focus','Lower until 90 degrees','Drive up to full extension','Keep elbows tracking back']},
  {id:42, name:'Close-Grip Bench Press', muscle:'Triceps', type:'Compound', equip:'Barbell', emoji:'👐', gifKey:'close grip barbell bench press', cues:['Hands shoulder-width apart','Elbows track close to body','Full range of motion','Triceps fully loaded']},
  {id:43, name:'Rope Pushdown', muscle:'Triceps', type:'Isolation', equip:'Cable', emoji:'🪢', gifKey:'cable tricep pushdown rope', cues:['Spread rope at bottom','Elbows at sides','Full extension each rep','Squeeze at lockout']},

  /* ── LEGS ── */
  {id:44, name:'Barbell Back Squat', muscle:'Legs', type:'Compound', equip:'Barbell', emoji:'🦵', gifKey:'barbell squat', cues:['Feet shoulder-width, toes out','Knees track over toes','Hit parallel or below','Drive through heels']},
  {id:45, name:'Front Squat', muscle:'Legs', type:'Compound', equip:'Barbell', emoji:'🦵', gifKey:'barbell front squat', cues:['Bar rests on front delts','Elbows high throughout','More upright torso','Quad-dominant movement']},
  {id:46, name:'Hack Squat', muscle:'Legs', type:'Compound', equip:'Machine', emoji:'🦵', gifKey:'hack squat', cues:['Feet high on platform for glutes','Knees track over toes','Full depth','Drive through heels']},
  {id:47, name:'Leg Press', muscle:'Legs', type:'Compound', equip:'Machine', emoji:'🦵', gifKey:'leg press', cues:['Feet shoulder-width on platform','Lower until 90 degrees','Do not lock knees at top','Control the descent']},
  {id:48, name:'Romanian Deadlift', muscle:'Legs', type:'Compound', equip:'Barbell', emoji:'🏋️', gifKey:'romanian deadlift', cues:['Push hips back not down','Bar stays close to legs','Feel hamstring stretch','Keep back flat throughout']},
  {id:49, name:'Bulgarian Split Squat', muscle:'Legs', type:'Compound', equip:'Dumbbell', emoji:'🦵', gifKey:'dumbbell bulgarian split squat', cues:['Rear foot elevated','Front foot forward enough','Drop straight down','Front knee over ankle']},
  {id:50, name:'Walking Lunge', muscle:'Legs', type:'Compound', equip:'Dumbbell', emoji:'🚶', gifKey:'dumbbell walking lunge', cues:['Long stride forward','Back knee nearly touches floor','Knee over ankle','Drive through front heel']},
  {id:51, name:'Leg Curl', muscle:'Legs', type:'Isolation', equip:'Machine', emoji:'🦵', gifKey:'lying leg curl', cues:['Hips stay flat on bench','Curl heels to glutes','Squeeze hamstrings at top','Full extension each rep']},
  {id:52, name:'Leg Extension', muscle:'Legs', type:'Isolation', equip:'Machine', emoji:'🦵', gifKey:'leg extension', cues:['Adjust so knee at edge','Full extension at top','Squeeze quads hard','Slow controlled descent']},
  {id:53, name:'Standing Calf Raise', muscle:'Legs', type:'Isolation', equip:'Machine', emoji:'🦶', gifKey:'standing calf raise', cues:['Full stretch at bottom','Rise to full height','Hold 1 second at top','Slow descent for time under tension']},
  {id:54, name:'Seated Calf Raise', muscle:'Legs', type:'Isolation', equip:'Machine', emoji:'🦶', gifKey:'seated calf raise', cues:['Targets soleus muscle','Full range of motion','Hold contraction at top','Slow controlled movement']},
  {id:55, name:'Barbell Hip Thrust', muscle:'Glutes', type:'Compound', equip:'Barbell', emoji:'🍑', gifKey:'barbell hip thrust', cues:['Upper back on bench','Bar padded over hip crease','Drive hips to ceiling','Squeeze glutes hard at top']},
  {id:56, name:'Cable Kickback', muscle:'Glutes', type:'Isolation', equip:'Cable', emoji:'🍑', gifKey:'cable pull through', cues:['Slight knee bend','Drive leg straight back','Squeeze glutes at top','Control return']},
  {id:57, name:'Sumo Squat', muscle:'Glutes', type:'Compound', equip:'Dumbbell', emoji:'🦵', gifKey:'dumbbell sumo squat', cues:['Wide stance toes pointed out','Dumbbell between legs','Knees track over toes','Inner thigh stretch at bottom']},
  {id:58, name:'Hip Abduction', muscle:'Glutes', type:'Isolation', equip:'Machine', emoji:'🍑', gifKey:'hip abduction', cues:['Seated upright','Push knees apart against resistance','Squeeze glutes at peak','Controlled return']},

  /* ── CORE ── */
  {id:59, name:'Plank', muscle:'Core', type:'Isometric', equip:'Bodyweight', emoji:'🧘', gifKey:'plank', cues:['Body in straight line','Engage core throughout','Do not let hips drop','Breathe steadily']},
  {id:60, name:'Crunch', muscle:'Core', type:'Isolation', equip:'Bodyweight', emoji:'💫', gifKey:'crunch', cues:['Hands behind head lightly','Curl chest to knees','Do not pull neck','Squeeze abs at top']},
  {id:61, name:'Sit-Ups', muscle:'Core', type:'Compound', equip:'Bodyweight', emoji:'🔄', gifKey:'sit up', cues:['Full range of motion','Touch elbows to knees','Control the descent','Engage core throughout']},
  {id:62, name:'Cable Crunch', muscle:'Core', type:'Isolation', equip:'Cable', emoji:'⬇️', gifKey:'cable crunch', cues:['Pull cable to forehead','Crunch down with abs','Round the lower back','Full stretch at top']},
  {id:63, name:'Russian Twist', muscle:'Core', type:'Rotation', equip:'Bodyweight', emoji:'🔄', gifKey:'russian twist', cues:['Feet elevated for harder version','Rotate fully side to side','Keep core braced','Touch floor each side']},
  {id:64, name:'Hanging Leg Raise', muscle:'Core', type:'Compound', equip:'Bodyweight', emoji:'🦵', gifKey:'hanging leg raise', cues:['Dead hang start','Raise legs to parallel','Do not swing','Slow controlled descent']},
  {id:65, name:'Ab Wheel Rollout', muscle:'Core', type:'Compound', equip:'Other', emoji:'⭕', gifKey:'ab wheel rollout', cues:['Knees on floor for beginners','Roll out as far as possible','Pull back with abs','Keep hips from dropping']},

  /* ── DEADLIFTS ── */
  {id:66, name:'Conventional Deadlift', muscle:'Back', type:'Compound', equip:'Barbell', emoji:'🏋️', gifKey:'deadlift', cues:['Bar over mid-foot','Hips and shoulders rise together','Drive floor away','Lock hips at top']},
  {id:67, name:'Sumo Deadlift', muscle:'Legs', type:'Compound', equip:'Barbell', emoji:'🏋️', gifKey:'sumo deadlift', cues:['Wide stance toes out','Grip inside legs','Chest up throughout','Push floor apart with feet']},
  {id:68, name:'Stiff-Leg Deadlift', muscle:'Legs', type:'Compound', equip:'Dumbbell', emoji:'🏋️', gifKey:'dumbbell straight leg deadlift', cues:['Minimal knee bend','Hinge at hips','Feel hamstring stretch','Back flat throughout']},
  {id:69, name:'Single-Leg RDL', muscle:'Legs', type:'Compound', equip:'Dumbbell', emoji:'🦵', gifKey:'single leg deadlift', cues:['Balance on one leg','Hinge to parallel','Back leg extends behind','Hip drives back not down']},

  /* ── CARDIO / FULL BODY ── */
  {id:70, name:'Burpees', muscle:'Full Body', type:'Cardio', equip:'Bodyweight', emoji:'🔥', gifKey:'burpee', cues:['Jump feet back to plank','Full push-up','Jump feet to hands','Jump and clap overhead']},
  {id:71, name:'Mountain Climbers', muscle:'Core', type:'Cardio', equip:'Bodyweight', emoji:'🧗', gifKey:'mountain climber', cues:['Start in push-up position','Drive knees to chest alternately','Keep hips level','Fast controlled pace']},
  {id:72, name:'Box Jump', muscle:'Legs', type:'Power', equip:'Other', emoji:'📦', gifKey:'box jump', cues:['Soft landing on box','Land with bent knees','Step down controlled','Explode from both feet']},
  {id:73, name:'Kettlebell Swing', muscle:'Full Body', type:'Compound', equip:'Other', emoji:'🏋️', gifKey:'kettlebell swing', cues:['Hip hinge not squat','Drive hips forward powerfully','Bell to shoulder height','Control descent between legs']},
  {id:74, name:'Battle Ropes', muscle:'Full Body', type:'Cardio', equip:'Other', emoji:'🌊', gifKey:'battle ropes', cues:['Hinge slightly at hips','Alternate arms rapidly','Keep core braced','Full arm extension each wave']},

  /* ── BODYWEIGHT ── */
  {id:75, name:'Diamond Push-Ups', muscle:'Triceps', type:'Compound', equip:'Bodyweight', emoji:'💎', gifKey:'diamond push up', cues:['Hands form diamond shape','Elbows track close to body','Full range of motion','Targets triceps heavily']},
  {id:76, name:'Pike Push-Ups', muscle:'Shoulders', type:'Compound', equip:'Bodyweight', emoji:'⬆️', gifKey:'pike push up', cues:['Hips high in air','Lower head toward floor','Press back to start','Targets shoulder press pattern']},
  {id:77, name:'Inverted Row', muscle:'Back', type:'Compound', equip:'Bodyweight', emoji:'🔝', gifKey:'inverted row', cues:['Body in straight line','Pull chest to bar','Squeeze shoulder blades','Full extension at bottom']},
  {id:78, name:'Glute Bridge', muscle:'Glutes', type:'Compound', equip:'Bodyweight', emoji:'🍑', gifKey:'glute bridge', cues:['Feet flat on floor','Drive hips to ceiling','Squeeze glutes at top','Single leg for harder version']},
  {id:79, name:'Squat Jumps', muscle:'Legs', type:'Power', equip:'Bodyweight', emoji:'🦘', gifKey:'jump squat', cues:['Squat to parallel','Explode upward','Soft landing','Continuous motion']},
  {id:80, name:'Superman', muscle:'Back', type:'Isolation', equip:'Bodyweight', emoji:'🦸', gifKey:'superman', cues:['Lie face down','Lift arms and legs simultaneously','Squeeze glutes and back','Hold 2 seconds at top']},
];

export const MUSCLES = ['All', 'Chest', 'Back', 'Legs', 'Glutes', 'Shoulders', 'Biceps', 'Triceps', 'Core', 'Full Body'];

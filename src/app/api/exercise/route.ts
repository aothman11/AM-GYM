import { NextRequest, NextResponse } from 'next/server';

// Verified working GIF URLs from fitnessprogramer.com
const EXERCISE_GIFS: Record<string, string> = {
  // CHEST
  'barbell bench press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
  'incline barbell bench press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif',
  'decline barbell bench press': 'https://fitnessprogramer.com/wp-content/uploads/2021/03/Decline-Barbell-Bench-Press.gif',
  'dumbbell bench press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press-1.gif',
  'incline dumbbell press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif',
  'decline dumbbell press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif',
  'cable crossover': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif',
  'dumbbell fly': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif',
  'incline dumbbell fly': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Fly.gif',
  'push up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif',
  'wide push up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Wide-Push-Up.gif',
  'diamond push up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Diamond-Push-up.gif',
  'chest dip': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Dip.gif',
  'pec deck fly': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif',
  'machine chest press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Chest-Press.gif',
  'close grip bench press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif',
  'close grip barbell bench press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif',

  // BACK
  'pull up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-Up.gif',
  'chin up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Chin-Up.gif',
  'lat pulldown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
  'close grip lat pulldown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Lat-Pulldown.gif',
  'barbell bent over row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif',
  'dumbbell row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
  'dumbbell one arm row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
  'seated cable row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif',
  'face pull': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif',
  't bar row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/T-Bar-Row.gif',
  'straight arm pulldown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Straight-Arm-Pulldown.gif',
  'inverted row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Inverted-Row.gif',
  'chest supported row': 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Chest-Supported-Dumbbell-Row.gif',
  'barbell shrug': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shrug.gif',

  // SHOULDERS
  'barbell shoulder press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif',
  'dumbbell shoulder press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
  'arnold press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif',
  'lateral raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
  'dumbbell lateral raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
  'front raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif',
  'dumbbell front raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif',
  'cable lateral raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Lateral-Raise.gif',
  'reverse pec deck fly': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Reverse-Pec-Deck-Fly.gif',
  'rear delt fly': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Rear-Delt-Fly.gif',
  'barbell upright row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Upright-Row.gif',
  'dumbbell shrug': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif',
  'machine shoulder press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Shoulder-Press.gif',

  // BICEPS
  'barbell curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif',
  'dumbbell curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
  'dumbbell bicep curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
  'hammer curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
  'preacher curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Preacher-Curl.gif',
  'barbell preacher curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Preacher-Curl.gif',
  'concentration curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif',
  'incline dumbbell curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Curl.gif',
  'cable curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Curl.gif',
  'ez bar curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/EZ-Bar-Curl.gif',
  'ez barbell curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/EZ-Bar-Curl.gif',
  'spider curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Spider-Curl.gif',

  // TRICEPS
  'tricep pushdown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif',
  'cable tricep pushdown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif',
  'rope pushdown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Rope-Pushdown.gif',
  'cable tricep pushdown rope': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Rope-Pushdown.gif',
  'tricep dip': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dip.gif',
  'bench dip': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dip.gif',
  'skull crusher': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Skull-Crusher.gif',
  'ez barbell skullcrusher': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Skull-Crusher.gif',
  'overhead tricep extension': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Triceps-Extension.gif',
  'dumbbell overhead tricep extension': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Triceps-Extension.gif',
  'tricep kickback': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif',
  'cable overhead tricep extension': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Overhead-Triceps-Extension.gif',

  // LEGS - QUADS
  'barbell squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Squat.gif',
  'barbell front squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Front-Squat.gif',
  'goblet squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Goblet-Squat.gif',
  'leg press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif',
  'hack squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hack-Squat.gif',
  'leg extension': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Extension.gif',
  'lunge': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif',
  'dumbbell walking lunge': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif',
  'walking lunge': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif',
  'bulgarian split squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bulgarian-Split-Squat.gif',
  'dumbbell bulgarian split squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bulgarian-Split-Squat.gif',
  'step up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Step-Up.gif',
  'sissy squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Sissy-Squat.gif',

  // LEGS - HAMSTRINGS
  'romanian deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif',
  'stiff leg deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Stiff-Leg-Deadlift.gif',
  'lying leg curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Curl.gif',
  'seated leg curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Leg-Curl.gif',
  'glute ham raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Glute-Ham-Raise.gif',
  'good morning': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Good-Morning.gif',
  'dumbbell straight leg deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Stiff-Leg-Deadlift.gif',

  // LEGS - GLUTES
  'barbell hip thrust': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif',
  'hip thrust': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif',
  'glute bridge': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Glute-Bridge.gif',
  'cable pull through': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Pull-Through.gif',
  'hip abduction': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hip-Abduction-Machine.gif',
  'hip adduction': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hip-Adduction-Machine.gif',
  'sumo squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Sumo-Squat.gif',
  'dumbbell sumo squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Sumo-Squat.gif',
  'donkey kick': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Donkey-Kicks.gif',
  'fire hydrant': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Fire-Hydrant.gif',

  // LEGS - CALVES
  'standing calf raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Standing-Calf-Raise.gif',
  'seated calf raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Seated-Calf-Raise.gif',
  'donkey calf raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Donkey-Calf-Raise.gif',
  'calf raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Standing-Calf-Raise.gif',

  // DEADLIFTS
  'deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
  'barbell deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
  'sumo deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Sumo-Deadlift.gif',
  'trap bar deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Trap-Bar-Deadlift.gif',
  'single leg deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/09/Single-Leg-Deadlift.gif',
  'deficit deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Deficit-Deadlift.gif',

  // CORE / ABS
  'plank': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif',
  'side plank': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Side-Plank.gif',
  'crunch': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch.gif',
  'sit up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Sit-Up.gif',
  'leg raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Raise.gif',
  'hanging leg raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hanging-Leg-Raise.gif',
  'russian twist': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif',
  'cable crunch': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crunch.gif',
  'ab wheel rollout': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Ab-Wheel-Rollout.gif',
  'bicycle crunch': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bicycle-Crunch.gif',
  'mountain climber': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Mountain-Climber.gif',
  'dead bug': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dead-Bug.gif',
  'superman': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Superman.gif',
  'v up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/V-Up.gif',
  'toe touch': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Toe-Touch.gif',
  'flutter kick': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Flutter-Kicks.gif',

  // CARDIO / FULL BODY
  'burpee': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Burpee.gif',
  'jumping jack': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Jumping-Jack.gif',
  'jump squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Jump-Squat.gif',
  'box jump': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Box-Jump.gif',
  'high knees': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/High-Knee-Run.gif',
  'jump rope': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Jump-Rope.gif',
  'kettlebell swing': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Kettlebell-Swing.gif',
  'battle rope': 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Battling-Ropes.gif',
  'battle ropes': 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Battling-Ropes.gif',
  'rowing': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Rowing-Machine.gif',
  'treadmill': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Treadmill.gif',
  'elliptical': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Elliptical-Machine.gif',
  'stair climber': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Stair-Climber.gif',

  // FOREARMS
  'wrist curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Wrist-Curl.gif',
  'reverse wrist curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Reverse-Wrist-Curl.gif',
  'farmers walk': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Farmers-Walk.gif',

  // PIKE PUSH UP (Shoulders)
  'pike push up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pike-Push-up.gif',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Missing name parameter' }, { status: 400 });
  }

  const nameLower = name.toLowerCase().trim();
  
  // Direct lookup
  if (EXERCISE_GIFS[nameLower]) {
    return NextResponse.json({ gifUrl: EXERCISE_GIFS[nameLower] });
  }
  
  // Partial match - check if exercise name contains or is contained by key
  for (const [key, url] of Object.entries(EXERCISE_GIFS)) {
    if (key.includes(nameLower) || nameLower.includes(key)) {
      return NextResponse.json({ gifUrl: url });
    }
  }
  
  // Word-based partial match
  const words = nameLower.split(' ').filter(w => w.length > 2);
  for (const [key, url] of Object.entries(EXERCISE_GIFS)) {
    const keyWords = key.split(' ');
    const matchCount = words.filter(w => keyWords.some(kw => kw.includes(w) || w.includes(kw))).length;
    if (matchCount >= 2 || (words.length === 1 && matchCount === 1)) {
      return NextResponse.json({ gifUrl: url });
    }
  }
  
  // Return a generic exercise GIF as fallback
  return NextResponse.json({ 
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Squat.gif',
    fallback: true 
  });
}

import type { ServiceDetailCopy } from "@/content/service-details";

/**
 * English copy for the 50 service pages. Same shape as `ServiceDetailCopy`
 * in `content/service-details.ts`, keyed by the service slug.
 *
 * `lib/i18n/serviceDetailText.ts` falls back to the Spanish text field by
 * field, so a service added later without a translation still renders a
 * complete page.
 *
 * Two things stay untranslated on purpose: service names (they come from
 * `content/services.ts` and its `nameEn` fields) and prices, which are always
 * shown in soles.
 *
 * Content note: nothing here promises medical or clinical results. Vita Lima
 * Spa is a massage and wellbeing studio, not a health facility, and the copy
 * says so wherever the subject invites the confusion.
 */
export const serviceDetailsEn: Record<string, ServiceDetailCopy> = {
  // ─────────────────────────────────────────────────────────────────────
  // INDIVIDUAL
  // ─────────────────────────────────────────────────────────────────────
  "relax-vital": {
    tagline: "Our most booked session: a full-body relaxing massage that closes with foot reflexology.",
    intro: [
      "Relax Vital is how most people meet Vita Lima, and for good reason: in one hour it covers the whole body with medium pressure, unhurried and without awkward moments. Your therapist works the back, neck, shoulders, arms and legs with long strokes and warm oil, adjusting the pressure to what your body asks for.",
      "The last stretch is foot reflexology. That's the part people remember: after an hour of body work, pressure on the points of the foot finishes slowing everything down, and most people leave with that feeling of having slept without having slept.",
    ],
    forWhom:
      "For anyone who has never had a massage and doesn't know where to start, and for anyone arriving from a long week of desks, traffic and screens.",
    benefits: [
      "The whole body in one session — no need to pick an area",
      "Medium pressure, comfortable even on a first visit",
      "Foot reflexology included in the price",
      "Available in San Borja and in Miraflores",
    ],
    session:
      "You arrive, spend a minute telling your therapist which areas bother you most, and from there the session runs without interruption: warm oil, low light, quiet music, one full hour.",
    faqs: [
      {
        q: "Is the massage very strong?",
        a: "No. Relax Vital works with steady medium pressure. If you want more intensity in one spot, tell your therapist at the start and she'll adjust; if you'd prefer something clearly deeper, Alivio Integral is the deep-tissue option.",
      },
      {
        q: "Do I need to bring anything?",
        a: "Nothing. We provide a towel, disposable underwear if you prefer it, and a place for your things. The only thing worth doing is arriving five minutes early so you don't start in a rush.",
      },
      {
        q: "Can I book it for two people?",
        a: "Relax Vital is a single-person session. For two tables in the same room, look at the For Two category: Break Time and Relax are the closest to this one.",
      },
    ],
  },

  "espalda-libre": {
    tagline: "45 minutes focused on the upper back, neck and shoulders.",
    intro: [
      "Espalda Libre doesn't try to cover the whole body — it concentrates on where it actually hurts after eight hours in front of a laptop. The entire session goes to the upper back, traps, neck and shoulders, which is where desk tension collects.",
      "You can choose a relaxing approach, with long strokes and medium pressure, or deep tissue, with focused work on the knots. Your therapist asks at the start and adjusts to what she finds.",
    ],
    forWhom:
      "For anyone who works seated, drives a lot or sleeps badly, and feels the load always lands in the same triangle between neck, shoulders and shoulder blades.",
    benefits: [
      "A short session that fits into a gap in the day",
      "All the time spent on the area that actually bothers you",
      "You choose the intensity: relaxing or deep tissue",
      "The most affordable option in the individual catalog",
    ],
    session:
      "Face down for most of the session, focused on the traps and the area around the shoulder blades, with the last few minutes on the neck with your head supported.",
    faqs: [
      {
        q: "Is 45 minutes enough?",
        a: "For the upper body, yes: because the time isn't spread across the whole body, your back gets more work than it would in a full one-hour massage.",
      },
      {
        q: "Does it help if my pain is in the lower back?",
        a: "Espalda Libre focuses on the upper back. If the discomfort is lumbar or spread out, Terapia Vita or Alivio Integral are the ones that cover the full back.",
      },
      {
        q: "Can I come often?",
        a: "Yes, many people use it as a fortnightly reset. If that sounds like you, the Muscle Therapy Program works out considerably cheaper per session.",
      },
    ],
  },

  "alivio-integral": {
    tagline: "Full-body deep-tissue massage, closing with foot reflexology.",
    intro: [
      "Alivio Integral is the deep version of our one-hour session. The pressure is firmer than in Relax Vital and the work stops at the points of tension instead of passing over them: locked shoulders, loaded lower back, a stiff neck from sleeping badly.",
      "It closes with foot reflexology, which after an hour of deep work acts as a gradual landing. It's the session most requested by people who train, who lift, and who have been putting this off for months.",
    ],
    forWhom:
      "For bodies carrying a real load: training, physical work, or months of accumulated tension that a gentle massage can't shift.",
    benefits: [
      "Deep pressure on the points that actually bother you",
      "Covers the whole body, not just the back",
      "Foot reflexology included to close",
      "Can be combined into 5- or 10-session programs",
    ],
    session:
      "Your therapist works across the body, finds the tight areas and returns to them with sustained pressure; if at any point it's too much, say so and she eases off immediately.",
    faqs: [
      {
        q: "Does it hurt?",
        a: "A deep-tissue massage done well feels intense, not painful. The rule of thumb is simple: if you're holding your breath, it's too much. Say so and your therapist adjusts.",
      },
      {
        q: "Might I be sore the next day?",
        a: "The area worked can feel tender for a day, similar to after a workout. Drinking water and avoiding hard effort that evening helps.",
      },
      {
        q: "How often is it worth repeating?",
        a: "If the load is constant, every two or three weeks keeps the area loose. That's exactly what the Muscle Therapy Program is for — it brings the per-session price down a lot.",
      },
    ],
  },

  "terapia-vita": {
    tagline: "A personalised therapeutic session, built around what your body needs that day.",
    intro: [
      "Terapia Vita has no fixed routine. The session opens with a few concrete questions — where it hurts, since when, which movement makes it worse — and from there your therapist decides which techniques to use and how much time to spend on each area.",
      "It might end up being almost a full hour on the lower back, or a general pass with focused work on neck and hips. It's the option for when you know something isn't right but you don't know what to ask for.",
    ],
    forWhom:
      "For anyone arriving with a specific complaint — or several — who would rather the session adapt than pick a fixed package.",
    benefits: [
      "The session is built around your complaint, not the other way around",
      "Combines techniques according to what your therapist finds",
      "A good first session if you don't know what to book",
      "Same length and price as a standard full massage",
    ],
    session:
      "It starts with a short, honest conversation about your body, and continues with whatever manual work that conversation points to: sustained pressure, gentle mobilisation or long strokes, depending on the case.",
    faqs: [
      {
        q: "How is it different from Alivio Integral?",
        a: "Alivio Integral is full-body deep tissue with a defined structure. Terapia Vita has no fixed structure: it's decided on the spot, based on what you bring.",
      },
      {
        q: "Does it help with a diagnosed injury?",
        a: "Always mention any injury, recent surgery or medical instruction before starting. Massage is a wellbeing service, not medical treatment, and in some cases your therapist may recommend checking with your doctor first.",
      },
      {
        q: "Can I ask her to focus on one area only?",
        a: "Yes. If you want the full hour on your back and neck, that's how it's done.",
      },
    ],
  },

  "balance-plus": {
    tagline: "70 minutes with hot stones, a back scrub and reflexology.",
    intro: [
      "Balance Plus is the step up from the one-hour massage: ten more minutes and three elements that change the experience considerably. It opens with a relaxing or deep-tissue massage — your choice — continues with hot stones across the back, and closes with a back scrub and foot reflexology.",
      "The hot stones do a good part of the work on their own: the heat opens the muscle before your therapist presses into it, so the pressure feels less abrupt and reaches deeper.",
    ],
    forWhom:
      "For anyone who already knows the basic massage and wants something fuller, without going as far as a two-hour session.",
    benefits: [
      "Hot stones: the heat opens the muscle before the manual work",
      "Back scrub included — your skin is noticeably smoother",
      "You choose a relaxing or deep-tissue approach",
      "A good middle ground between the standard session and the premium ones",
    ],
    session:
      "Body massage, then the stones resting and gliding across the back, a product scrub on the back, and foot reflexology to close.",
    faqs: [
      {
        q: "Do the stones burn?",
        a: "No. They're heated to a controlled temperature and your therapist always tests the contact before resting them on you. If they feel too hot for you, they come off straight away.",
      },
      {
        q: "Does the scrub leave skin irritated?",
        a: "It shouldn't. It's a gentle back scrub with a fine-grain product. If your skin is very sensitive or there's any lesion in the area, mention it beforehand.",
      },
      {
        q: "Can I book it with more time?",
        a: "Yes: Deep Balance 120 is the two-hour version, with warm compresses on top of the stones.",
      },
    ],
  },

  "glow-facial": {
    tagline: "A body massage plus an express facial cleanse finished with a collagen mask.",
    intro: [
      "Glow Facial settles two things in one visit: the body and the face. First a relaxing or deep-tissue massage, then an express facial cleanse that finishes with a collagen mask.",
      "It's the session most often booked before an event — a wedding, an important meeting, a trip — because it combines the effect of the massage with a visibly more rested face on the way out.",
    ],
    forWhom:
      "For anyone with a date in the calendar who wants to arrive rested and looking well, without booking two separate appointments.",
    benefits: [
      "Body and face in a single 75-minute session",
      "Collagen mask included",
      "You choose a relaxing or deep-tissue approach for the massage",
      "Visible effect the same day",
    ],
    session:
      "Body massage face down and face up, then the facial work: cleansing, gentle extraction if needed, and the mask with a few minutes to settle.",
    faqs: [
      {
        q: "Can I wear make-up afterwards?",
        a: "Better to wait a few hours. Your skin is left hydrated and the pores open; giving it a while before make-up makes the result last longer.",
      },
      {
        q: "Is it suitable for sensitive skin?",
        a: "The express cleanse is gentle. Do tell us if you use acids or retinol, or if you've had a recent dermatological procedure — in those cases our aesthetician adapts the protocol or suggests waiting.",
      },
      {
        q: "Is there a fuller version?",
        a: "Yes. Glow Facial Plus adds hot stones and a drink, and Glow Facial Premium swaps the collagen for a hyaluronic acid lifting mask plus an antioxidant serum.",
      },
    ],
  },

  "deep-balance-120": {
    tagline: "Two full hours: massage, hot stones, warm compresses and reflexology.",
    intro: [
      "Deep Balance 120 is the longest individual session in the catalog, and the difference isn't only the time: with two hours your therapist can work the whole body without rushing a single area, alternating relaxing and deep-tissue work according to what she finds.",
      "Along the way come the hot stones and the warm compresses, which keep the muscle open throughout. It closes with foot reflexology. This is the session for someone who hasn't had a massage in a long time and wants to settle it properly.",
    ],
    forWhom:
      "For bodies with months of accumulated tension, and for anyone who wants to switch off completely and not watch the clock.",
    benefits: [
      "Two hours: enough for the whole body without rushing anything",
      "Combines relaxing and deep-tissue work in the same session",
      "Sustained heat from stones and compresses",
      "Foot reflexology included to close",
    ],
    session:
      "One long, uninterrupted pass: back, legs, arms, neck and head, with the stones and compresses coming in wherever the muscle calls for them.",
    faqs: [
      {
        q: "Isn't two hours too long?",
        a: "Most people lose track of time after twenty minutes. If at any point you want to change position or pause, that's no problem.",
      },
      {
        q: "Should I book well in advance?",
        a: "Yes. It's a long block of table time, so there are fewer available slots than for a 60-minute session.",
      },
      {
        q: "Can I do it as a couple?",
        a: "This one is for a single person. For two people at this length, Supreme (150 minutes) is the equivalent experience.",
      },
    ],
  },

  "aroma-zen": {
    tagline: "A massage with aromatherapy and an artisan soy candle you take home.",
    intro: [
      "Aroma Zen adds something to the session that doesn't appear on a price list: scent. Aromatherapy runs through the whole massage, and the Indalo soy candle lit in your room is yours to take home afterwards.",
      "The massage can be relaxing or deep tissue and closes with foot reflexology. It's the session for when the goal isn't only the muscle, but turning down the mental noise of a long week.",
    ],
    forWhom:
      "For anyone looking for a moment of calm more than a therapeutic session, and for anyone who likes taking a piece of the spa home.",
    benefits: [
      "Indalo soy candle included, yours to keep",
      "Aromatherapy throughout the session",
      "Foot reflexology to close",
      "Excellent as a gift to yourself",
    ],
    session:
      "The candle is lit at the start, the room fills with scent, and the massage runs in that atmosphere through to the closing reflexology.",
    faqs: [
      {
        q: "Can I choose the scent?",
        a: "There are several options depending on stock; mention it when you arrive and your therapist will show you what's available that day.",
      },
      {
        q: "Do I really get to keep the candle?",
        a: "Yes, the soy candle is included in the price and you take it with you at the end.",
      },
      {
        q: "What if I'm sensitive to strong scents?",
        a: "Tell us when booking. The session can be done with very light scent, or with no aromatherapy at all.",
      },
    ],
  },

  "coco-premium": {
    tagline: "80 minutes with a coconut body scrub, hot stones and a glass of wine.",
    intro: [
      "Coco Premium has the most elements of any mid-range individual session: a relaxing or deep-tissue massage, hot stones, a coconut body scrub, foot reflexology, aromatherapy, and a glass of wine or an infusion to finish.",
      "The coconut scrub is what sets it apart. It leaves the skin soft and the scent lingers for a good while; it's the session people choose when they want it to feel like a treat.",
    ],
    forWhom:
      "For a birthday, the end of a hard month, or simply to give yourself a full afternoon.",
    benefits: [
      "Coconut body scrub included",
      "Hot stones and aromatherapy in the same session",
      "A glass of wine or an infusion at the end",
      "80 minutes: real time, nothing rushed",
    ],
    session:
      "Massage, stones, coconut scrub and reflexology, and a few minutes sitting with your drink before heading back out.",
    faqs: [
      {
        q: "Is the scrub full body?",
        a: "It covers the back of the body and the limbs. If you'd rather concentrate it on one area, mention it at the start.",
      },
      {
        q: "Can I have an infusion instead of wine?",
        a: "Always. You choose your drink on the day.",
      },
      {
        q: "Is there a version for two?",
        a: "Yes: Coco Premium for Two, with two tables in the same room and two glasses.",
      },
    ],
  },

  "piedras-calientes": {
    tagline: "A relaxing massage with hot basalt stones across the back.",
    intro: [
      "A session built around heat. Basalt stones are warmed to a controlled temperature and rested and glided across the back while your therapist works with her hands between passes.",
      "The heat makes the muscle give way sooner, so the pressure feels gentler than it actually is. It's a favourite among people with a stiff back who don't tolerate a hard deep-tissue massage well.",
    ],
    forWhom:
      "For anyone who runs cold, carries background tension, and prefers an intense session without aggressive pressure.",
    benefits: [
      "The heat opens the muscle and makes the pressure easier to take",
      "A sense of relaxation that lasts for hours afterwards",
      "Ideal during Lima's damp months",
      "A 60-minute session at the price of a standard massage",
    ],
    session:
      "Alternating between resting stones, moving stones and manual work, almost entirely face down.",
    faqs: [
      {
        q: "How hot are the stones?",
        a: "At a controlled warm-to-hot temperature. Your therapist always tests them on her own hand and then on your skin before leaving them resting.",
      },
      {
        q: "Are there cases where it isn't advisable?",
        a: "Do mention circulatory issues, pronounced varicose veins, very sensitive skin, or if you're pregnant — in those cases your therapist will suggest another option.",
      },
      {
        q: "Can it be combined with other techniques?",
        a: "Yes. Balance Plus, Deep Balance 120 and Coco Premium already include hot stones alongside other elements.",
      },
    ],
  },

  bambuterapia: {
    tagline: "A massage using bamboo canes of different thicknesses for deep work.",
    intro: [
      "In bamboo therapy your therapist replaces part of the manual work with bamboo canes of various diameters. The cane allows deep, even pressure that would be hard to sustain by hand for a whole session, and it covers large areas — thighs, glutes, back — efficiently.",
      "It feels different from a conventional massage: more rhythmic, with long firm glides. It's a popular choice among people who play sport and anyone looking for body-contouring work.",
    ],
    forWhom:
      "For anyone after deep, sustained pressure, and for anyone who has already tried the classic massage and wants something different.",
    benefits: [
      "Deep, even pressure that's hard to achieve with hands alone",
      "Efficient work on large areas: legs, glutes and back",
      "A draining, lighter feeling afterwards",
      "Also included in the Respira, Renova and Bioenergético Oriental experiences",
    ],
    session:
      "Long glides with the canes over oiled skin, alternating with manual work on the spots that need more detail.",
    faqs: [
      {
        q: "Is it painful?",
        a: "It's firm, not painful. Your therapist starts with moderate pressure and builds according to what you say.",
      },
      {
        q: "Does it help with cellulite or body contouring?",
        a: "Bamboo therapy is widely used in contouring protocols for its draining and circulation-activating effect, but it's a wellbeing service: it doesn't promise measurable aesthetic results or replace a specialist treatment.",
      },
      {
        q: "Could I be left with marks?",
        a: "It isn't usual. If your skin marks easily, say so and we work with less pressure.",
      },
    ],
  },

  shiatsu: {
    tagline: "Pressure applied with fingers and palms on specific points, without oil.",
    intro: [
      "Shiatsu is a Japanese technique that works through pressure: your therapist uses fingers, palms and sometimes forearms on points and lines of the body, holding each for a few seconds rather than gliding.",
      "It's done in comfortable clothes and without oil, which makes it a good option if you don't want to leave with oiled skin or if you're heading straight back to work.",
    ],
    forWhom:
      "For anyone who prefers focused pressure over gliding strokes, and for anyone who wants a massage without oil.",
    benefits: [
      "Done in comfortable clothing, no oil",
      "Sustained pressure on specific points",
      "A good midday option — no need to shower afterwards",
      "Includes gentle assisted stretching",
    ],
    session:
      "Held pressure point by point across the back, hips, legs and shoulders, with some assisted stretches between sequences.",
    faqs: [
      {
        q: "What should I wear?",
        a: "Something comfortable and stretchy. If you're coming from the office, we provide suitable disposable clothing at the spa.",
      },
      {
        q: "Does it feel like less than an oil massage?",
        a: "It feels different, not lighter. Sustained pressure on one point is usually perceived as more intense than a glide.",
      },
      {
        q: "Can I combine it with reflexology?",
        a: "Yes, mention it when booking and your therapist will split the time between both techniques.",
      },
    ],
  },

  "drenaje-linfatico": {
    tagline: "Gentle, rhythmic strokes to support circulation and a lighter feeling.",
    intro: [
      "Lymphatic drainage is unlike any other massage in the catalog: the pressure is very light and the rhythm slow and repetitive. It isn't trying to release knots, but to follow the natural path of the lymphatic system with strokes in a specific direction.",
      "The sensation during the session is almost hypnotic, and afterwards most people describe lighter legs and abdomen. It's one of the most requested services after long flights or days spent standing.",
    ],
    forWhom:
      "For anyone with a feeling of heaviness or swelling in the legs, after long journeys, and for anyone who doesn't tolerate firm pressure.",
    benefits: [
      "Very light pressure, suitable if deep massage isn't for you",
      "A lighter feeling in the legs and abdomen",
      "A steady rhythm that induces deep relaxation",
      "Can be repeated frequently",
    ],
    session:
      "Slow, superficial, repeated strokes always following the same direction, beginning at the drainage areas and working outwards.",
    faqs: [
      {
        q: "Will it feel like nothing is happening?",
        a: "At first the gentleness is surprising. The effect isn't in the force but in the repetition and the direction of the strokes.",
      },
      {
        q: "Is it suitable after surgery?",
        a: "Post-operative drainage is a clinical procedure that must be prescribed and supervised by your doctor. Ours is a wellbeing service: if you've had recent surgery, check with your specialist first.",
      },
      {
        q: "How often is it worth having?",
        a: "People who book it for heaviness usually repeat every one or two weeks.",
      },
    ],
  },

  "masaje-prenatal": {
    tagline: "A gentle, safe massage for expectant mothers, side-lying with cushion support.",
    intro: [
      "The prenatal massage is designed for a body that changes week by week. You lie on your side with support cushions, and the pressure is gentle and steady, focused on the lower back, hips, legs and shoulders — the areas that carry the most load during pregnancy.",
      "The areas and techniques that aren't appropriate during pregnancy are avoided, and you set the pace: if you need to change position, sit up or pause, that's fine.",
      "It's also available as a package of 2 sessions for S/ 128.",
    ],
    forWhom:
      "For expectant mothers with lower-back discomfort, tired legs or trouble resting, with their doctor's approval.",
    benefits: [
      "Side-lying with support, comfortable at any advanced stage",
      "Gentle pressure, no contraindicated techniques",
      "Focused on lower back, hips and legs",
      "Package of 2 sessions for S/ 128",
    ],
    session:
      "You're settled comfortably on your side with cushions, and the work moves unhurriedly across the lower back, hips, legs and shoulders, with pauses whenever you need them.",
    faqs: [
      {
        q: "From which week can I book it?",
        a: "Usually from the second trimester, but your doctor is always the reference. Check before booking and let us know of any instructions.",
      },
      {
        q: "Are there cases where it can't be done?",
        a: "Yes. With a high-risk pregnancy, high blood pressure, bleeding or any instruction to rest, massage isn't appropriate. If you have any doubt, ask your doctor first.",
      },
      {
        q: "Can I bring someone with me?",
        a: "Of course. They can wait at reception or book their own session in parallel.",
      },
    ],
  },

  "bioenergetico-esferas-solo": {
    tagline: "A massage with Chinese spheres: pressure, warmth and movement over tense areas.",
    intro: [
      "The bioenergetic massage with Chinese spheres uses metal spheres that your therapist rolls and presses across the back and limbs. The combination of weight, temperature and circular movement feels very different from an open hand.",
      "It's a 70-minute session, unhurried, usually described more as a ritual than as a sports massage. A good choice if you're looking for something other than what you already know.",
    ],
    forWhom:
      "For anyone who has tried the classic massages and wants a different experience, with more of a ritual to it.",
    benefits: [
      "A technique that's uncommon in Lima",
      "Combines pressure, weight and circular movement",
      "70 unhurried minutes",
      "Also part of Bioenergético Oriental and Renace",
    ],
    session:
      "Circular passes with the spheres over oiled skin, alternating with focused pressure and manual work.",
    faqs: [
      {
        q: "Are the spheres cold?",
        a: "They're brought to temperature before starting. If you prefer warmer contact, just say so.",
      },
      {
        q: "Is it an energy treatment?",
        a: "The name comes from the tradition behind the technique. We offer it for what it is: a massage session with a particular tool and rhythm, with no claims beyond wellbeing.",
      },
      {
        q: "Is there a fuller version?",
        a: "Yes: Bioenergético Oriental adds bamboo therapy, reflexology and a singing-bowl close for the same price.",
      },
    ],
  },

  ventosas: {
    tagline: "A massage combined with suction cups over the most loaded areas.",
    intro: [
      "The session combines a relaxing or deep-tissue massage with cupping. The cup creates suction on the skin and muscle, producing a pulling sensation that many describe as the exact opposite of the pressure of a normal massage.",
      "They're used mostly on the back and shoulders, where tension is most stubborn. It's a very popular technique among athletes.",
    ],
    forWhom:
      "For heavily loaded backs, for athletes, and for anyone who has tried everything else and is looking for another route.",
    benefits: [
      "A release sensation unlike any pressure massage",
      "Combined with manual massage in the same session",
      "Widely used on areas of persistent tension",
      "A 60-minute session",
    ],
    session:
      "First massage to prepare the tissue, then the cups resting or gliding over the chosen area, closing with manual work.",
    faqs: [
      {
        q: "Does it leave marks?",
        a: "Yes, reddish or purple circles for a few days are common. They don't hurt, but it's worth bearing in mind if you have an event coming up or you're heading to the beach.",
      },
      {
        q: "Does it hurt?",
        a: "It feels like a sustained pull, not a pinch. The strength of the suction is adjustable.",
      },
      {
        q: "Can I ask for them not to be used on a certain area?",
        a: "Of course. They're only applied where you agree.",
      },
    ],
  },

  reflexologia: {
    tagline: "30 minutes of pressure on the reflex points of the foot.",
    intro: [
      "Foot reflexology works the whole foot: sole, instep, toes and ankle, with firm pressure on specific points. Half an hour is enough to cover it all without rushing.",
      "It's the shortest session in the catalog and one of the most requested by people who spend the day standing or walking. It's also a good first experience if a full-body massage feels like too much.",
    ],
    forWhom:
      "For anyone on their feet a lot, for anyone short on time, and for anyone who'd rather not undress.",
    benefits: [
      "A short session that fits any schedule",
      "No need to undress",
      "Immediate relief for tired feet",
      "The lowest-priced option in the catalog",
    ],
    session:
      "Seated or reclined with your feet supported: an initial wash, point-by-point pressure, and gentle stretching of the toes and ankle.",
    faqs: [
      {
        q: "Do I have to undress?",
        a: "No. Only your feet are uncovered.",
      },
      {
        q: "Is it ticklish?",
        a: "The firm pressure of reflexology doesn't produce ticklishness; light brushing does. That's why your therapist works with sustained pressure from the start.",
      },
      {
        q: "Is there a longer version?",
        a: "Yes, Reflexología Plus, at 45 minutes, which allows more detailed work on each area.",
      },
    ],
  },

  "reflexologia-plus": {
    tagline: "45 minutes of foot reflexology, with more detail on each area.",
    intro: [
      "The extended version of reflexology. With fifteen extra minutes, your therapist can dwell on the areas that are most sensitive rather than moving across the foot at an even pace, and add work on the ankle and lower calf.",
      "It's the choice of people who tried the 30-minute session and found it too short.",
    ],
    forWhom:
      "For anyone walking or standing for many hours a day who wants more detailed work than the standard session.",
    benefits: [
      "15 extra minutes to keep returning to what really bothers you",
      "Includes work on the ankle and lower calf",
      "Still no need to undress",
      "Well priced for its length",
    ],
    session:
      "The same as standard reflexology, but with real time to go back two or three times over the most sensitive points.",
    faqs: [
      {
        q: "Is it worth it over the 30-minute one?",
        a: "If your feet bother you often, yes: the difference shows most in the work on the sole and the arch.",
      },
      {
        q: "Can I combine it with a back massage?",
        a: "Yes. Mention it when booking and we'll put the combination together, or look at Espalda Libre and Relax Vital, which already include both.",
      },
      {
        q: "Does it help with plantar fasciitis?",
        a: "With any diagnosed foot condition, check with your doctor first. Reflexology is a wellbeing service and doesn't replace treatment.",
      },
    ],
  },

  "para-regalar-60": {
    tagline: "A 60-minute session that comes with a teddy bear and a drink included.",
    intro: [
      "Para Regalar exists because the session is often the gift, and a loose voucher doesn't feel like one. It includes a relaxing massage, hot stones and foot reflexology, plus a teddy bear and a drink handed over on the day of the appointment.",
      "It can be booked for someone else: you give us their name, we arrange the date with them, and they arrive at a session that's already paid for with the gift ready.",
    ],
    forWhom:
      "For birthdays, Mother's Day, anniversaries, or any occasion where you want to give something that gets enjoyed, not stored away.",
    benefits: [
      "Teddy bear and drink included in the price",
      "Massage, hot stones and reflexology in 60 minutes",
      "Can be booked in someone else's name",
      "An alternative to a gift card when you already know the date",
    ],
    session:
      "A full 60-minute session, with the gift handed over at the end along with the drink.",
    faqs: [
      {
        q: "How do I gift it if I don't know when they can come?",
        a: "In that case a Gift Card works better: you buy it now and they choose the date later. Message us on WhatsApp and we'll explain the options.",
      },
      {
        q: "Can I add a card with a message?",
        a: "Yes, mention it when booking and we'll prepare it.",
      },
      {
        q: "Is there a fuller version?",
        a: "Yes: Para Regalar Plus, at 80 minutes, which also includes a back scrub.",
      },
    ],
  },

  "para-regalar-80": {
    tagline: "80 minutes with a back scrub, a teddy bear and a drink.",
    intro: [
      "The long version of the gift. To the 60 minutes of massage, hot stones and reflexology it adds twenty more minutes and a back scrub, which is what turns the session into something clearly fuller.",
      "It includes the same gift: a teddy bear and a drink on the day of the appointment.",
    ],
    forWhom:
      "For an important gift — a milestone birthday, an anniversary — where you want the difference to show.",
    benefits: [
      "80 minutes: a back scrub on top of everything else",
      "Teddy bear and drink included",
      "Can be booked in someone else's name",
      "The fullest gift option outside the gift boxes",
    ],
    session:
      "Relaxing massage, hot stones, back scrub and foot reflexology, with the gift handed over at the end.",
    faqs: [
      {
        q: "Can it be combined with a gift box?",
        a: "Yes. The boxes (Clásico, Suculentas, Flores, Vino, Wellness) are in the Gift Cards section and can be arranged alongside the session.",
      },
      {
        q: "Is the scrub full body?",
        a: "It covers the back. For a wider scrub, Coco Premium is the option.",
      },
      {
        q: "How far ahead should I book?",
        a: "For peak dates like Mother's Day, the earlier the better: slots fill weeks in advance.",
      },
    ],
  },

  "bioenergetico-oriental": {
    tagline: "Chinese spheres, bamboo therapy, reflexology and a singing-bowl close.",
    intro: [
      "Bioenergético Oriental brings together four elements of Eastern tradition in 70 minutes: Chinese spheres, bamboo canes, foot reflexology, and a closing harmonisation with singing bowls.",
      "The order is designed to move from the most physical to the most subtle: first the spheres and bamboo work the muscle with pressure and weight, then reflexology slows the pace, and the bowls close the session with vibration and sound.",
    ],
    forWhom:
      "For anyone looking for something other than a conventional massage, with a ritual, sensory dimension to it.",
    benefits: [
      "Four techniques in a single 70-minute session",
      "Combines deep muscle work with a sound-based close",
      "Uncommon in Lima",
      "A good gift for someone who has already tried the classics",
    ],
    session:
      "Spheres and bamboo across the back and legs, foot reflexology, and a few closing minutes of singing bowls with the body already at rest.",
    faqs: [
      {
        q: "What are the singing bowls?",
        a: "Metal bowls that produce a sustained tone and vibration when rubbed. They're placed near the body at the close of the session.",
      },
      {
        q: "Does it have a proven therapeutic effect?",
        a: "We offer it as a wellbeing and relaxation experience, without attributing medical effects to it.",
      },
      {
        q: "Can I book just one part of it?",
        a: "Yes: Chinese Spheres and Bamboo Therapy both exist as standalone sessions.",
      },
    ],
  },

  "glow-facial-plus": {
    tagline: "80 minutes: massage with hot stones, a facial cleanse and a drink.",
    intro: [
      "Glow Facial Plus stretches out the Glow Facial idea: the massage now includes hot stones and the session runs to 80 minutes, with a full facial cleanse and a drink at the end.",
      "It's the combination most often booked for a full free afternoon: you leave with a loose body, a clean face and no rush.",
    ],
    forWhom:
      "For anyone who wants to settle body and face calmly and has the afternoon free.",
    benefits: [
      "Hot stones added to the body massage",
      "Full facial cleanse included",
      "A drink to close",
      "80 minutes with nothing rushed",
    ],
    session:
      "Massage with stones, then the facial block: cleansing, toning and a mask, with your drink at the end.",
    faqs: [
      {
        q: "How is it different from Glow Facial?",
        a: "Glow Facial runs 75 minutes with an express cleanse and a collagen mask. Plus adds hot stones to the massage and a drink at the close.",
      },
      {
        q: "And from Glow Facial Premium?",
        a: "Premium swaps the collagen mask for a hyaluronic acid lifting mask and adds an antioxidant serum.",
      },
      {
        q: "Is it advisable if I have active acne?",
        a: "Mention it when booking. During active breakouts our aesthetician usually recommends a more specific cleanse, or waiting.",
      },
    ],
  },

  "glow-facial-premium": {
    tagline: "90 minutes with a hyaluronic acid lifting mask and an antioxidant serum.",
    intro: [
      "The fullest version of the Glow line. A massage with hot stones, and then a facial protocol with a hyaluronic acid lifting mask and an antioxidant serum, in place of the collagen mask used in the earlier versions.",
      "Ninety minutes in total. It's the session booked before an important event, or when you want a visible result the same day.",
    ],
    forWhom:
      "For skin that looks dull or tired, and for anyone who wants the best facial result in the catalog combined with a massage.",
    benefits: [
      "Hyaluronic acid lifting mask",
      "Antioxidant serum included",
      "Massage with hot stones in the same session",
      "90 minutes: the fullest facial protocol",
    ],
    session:
      "A body block with stones, and a long facial block: cleansing, exfoliation, lifting mask with settling time, and a closing serum.",
    faqs: [
      {
        q: "How long does the effect last?",
        a: "The hydrated, rested look usually shows for several days. Like any cosmetic treatment, it isn't permanent.",
      },
      {
        q: "Can I have it the same day as my event?",
        a: "Yes, and that's the most common choice. Leave a few hours before applying make-up.",
      },
      {
        q: "Is it compatible with retinol or acids?",
        a: "Let us know if you use them. Depending on the case, our aesthetician adapts the protocol or suggests spacing out the treatments.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // FOR TWO
  // ─────────────────────────────────────────────────────────────────────
  "break-time": {
    tagline: "50 minutes for two, in the same room, with two therapists.",
    intro: [
      "Break Time is the way into the experiences for two: two tables in the same room, two therapists working in parallel, and a relaxing or deep-tissue massage, whichever each of you prefers.",
      "It's the most affordable option in the category and works well when it isn't a special occasion — just the wish to do it together.",
    ],
    forWhom:
      "For couples, friends, mother and daughter: any pair who want to share the session without spending on a long experience.",
    benefits: [
      "Two tables in the same private room",
      "Each person chooses their own type of massage",
      "The most affordable price among the experiences for two",
      "Fits into a short window in the day",
    ],
    session:
      "You both go in together, settle onto parallel tables, and the two therapists work at the same pace throughout the 50 minutes.",
    faqs: [
      {
        q: "Can we choose different massages?",
        a: "Yes. One of you can ask for relaxing and the other for deep tissue, no problem.",
      },
      {
        q: "Is the price for both of us?",
        a: "Yes, the published price covers both people.",
      },
      {
        q: "Is there anything fuller?",
        a: "Yes, the whole For Two category: Relax, Vita, Esencia, Deluxe, Royale and Supreme add stones, reflexology, aromatherapy and drinks.",
      },
    ],
  },

  "sacro-craneal": {
    tagline: "Craniosacral work with a herbal compress, for two people.",
    intro: [
      "Sacro Craneal is the gentlest experience in the For Two category. Craniosacral work uses sustained contact and very little pressure at the base of the skull, the neck and the sacral area, and it's combined with a warm herbal compress, a relaxing massage, foot reflexology and aromatherapy.",
      "It's the choice of people who arrive with a busier head than body: poor sleep, screens until late, weeks of sustained stress.",
    ],
    forWhom:
      "For two people looking to slow down rather than work the muscle, and for anyone who doesn't tolerate firm pressure.",
    benefits: [
      "A very gentle technique based on sustained contact",
      "Warm herbal compress included",
      "Foot reflexology and aromatherapy in the same session",
      "Both people in the same room",
    ],
    session:
      "Gentle, prolonged contact at the head, neck and sacral area, with the herbal compress resting on the body, closing with reflexology.",
    faqs: [
      {
        q: "Does it feel like very little?",
        a: "The pressure is minimal on purpose. Most people describe it as deeply relaxing, unlike any massage based on force.",
      },
      {
        q: "What is the herbal compress?",
        a: "A bundle of herbs wrapped in cloth that is warmed and rested on the body; it adds heat and scent.",
      },
      {
        q: "Does it help with tension headaches?",
        a: "Many people book it for that reason, but it's a wellbeing session: if you get frequent headaches, discuss it with your doctor.",
      },
    ],
  },

  respira: {
    tagline: "A relaxing massage with bamboo therapy, body hydration and a glass of wine, for two.",
    intro: [
      "Respira combines a relaxing massage with bamboo therapy, full body hydration, foot reflexology, and a glass of wine or an infusion for each of you.",
      "The body hydration is what sets it apart in its price range: at the end your skin is visibly different, not just the muscle loosened.",
    ],
    forWhom:
      "For a couple or two friends who want a complete experience without reaching the premium range.",
    benefits: [
      "Bamboo therapy included — deep, even pressure",
      "Full body hydration",
      "Foot reflexology and a glass of wine or an infusion",
      "An hour for the two of you in the same room",
    ],
    session:
      "Massage with hands and bamboo canes, hydration of the whole body, foot reflexology, and a few closing minutes with your drink.",
    faqs: [
      {
        q: "What is the body hydration?",
        a: "Cream or body butter applied with gentle massage strokes over the whole body, at the end of the session.",
      },
      {
        q: "Is the bamboo therapy for both of us?",
        a: "Yes, you both get the same experience. If one of you prefers hands only, that can be adjusted.",
      },
      {
        q: "Can we have it without alcohol?",
        a: "Yes, an infusion is always an alternative.",
      },
    ],
  },

  relax: {
    tagline: "Your choice of massage with hot stones, reflexology and a glass of wine, for two.",
    intro: [
      "Relax is the most booked experience for two in the catalog. Each person chooses a relaxing or deep-tissue massage, and to that are added hot stones, foot reflexology, aromatherapy, and a glass of wine or an infusion.",
      "It has everything you'd expect from a session as a couple without stepping into the long packages: one hour, in the same room, with the elements that make the difference.",
    ],
    forWhom:
      "For an anniversary, a birthday, or a weekend plan as a couple.",
    benefits: [
      "Each person chooses their type of massage",
      "Hot stones and aromatherapy included",
      "Foot reflexology to close",
      "A glass of wine or an infusion for each of you",
    ],
    session:
      "Both of you on parallel tables: massage, stones across the back, reflexology and aromatherapy, with your drink at the end.",
    faqs: [
      {
        q: "Is it the best option for an anniversary?",
        a: "It's the most chosen one for what it includes against what it costs. If you want something clearly longer, Vita, Esencia or Deluxe raise the stakes.",
      },
      {
        q: "Can it be booked as a surprise?",
        a: "Yes. Message us on WhatsApp and we'll arrange the date with you.",
      },
      {
        q: "Is the room private?",
        a: "Yes, the session for two takes place in a private room with two tables.",
      },
    ],
  },

  vita: {
    tagline: "70 minutes for two, with a chocolate or peach body scrub.",
    intro: [
      "Vita adds to the Relax formula a scrub on the back of the body scented with chocolate or peach — you choose on the day — plus ten more minutes of session.",
      "It's one of the experiences people remember by its scent: the room holds it for the whole session.",
    ],
    forWhom:
      "For two people who want something longer with an element they'll remember, without moving to the two-hour experiences.",
    benefits: [
      "Chocolate or peach scrub on the back of the body",
      "Hot stones, reflexology and aromatherapy",
      "70 minutes, ten more than the standard session",
      "A glass of wine or an infusion included",
    ],
    session:
      "Relaxing massage, hot stones, a scrub on the back of the body in your chosen scent, reflexology, and a closing drink.",
    faqs: [
      {
        q: "Can we choose different scents?",
        a: "Yes, each of you picks your own.",
      },
      {
        q: "Does the scrub leave skin sticky?",
        a: "No: it's fully removed before the session continues.",
      },
      {
        q: "How is it different from Renova?",
        a: "Renova costs the same but swaps the scrub for bamboo therapy and a bioenergetic massage with Chinese spheres.",
      },
    ],
  },

  renova: {
    tagline: "A herbal massage with bamboo therapy and Chinese spheres, for two.",
    intro: [
      "Renova is the most technique-driven experience in the mid range for two: a herbal relaxing massage, bamboo therapy, foot reflexology, aromatherapy and a bioenergetic massage with Chinese spheres, plus a glass of wine or an infusion.",
      "Unlike Vita, there's no scrub here: all the time goes into body work with different tools.",
    ],
    forWhom:
      "For two people who'd rather have more massage and less cosmetic ritual.",
    benefits: [
      "Three different techniques: herbal, bamboo and Chinese spheres",
      "70 minutes of continuous body work",
      "Foot reflexology and aromatherapy",
      "A glass of wine or an infusion for each of you",
    ],
    session:
      "Herbal massage, bamboo canes, Chinese spheres and reflexology, run one into the next without long pauses.",
    faqs: [
      {
        q: "What is the herbal massage?",
        a: "A relaxing massage using herbal-base oils and products, with a scent that's more botanical than sweet.",
      },
      {
        q: "Is it more intense than Vita?",
        a: "Yes, in terms of muscle work. Vita leans more sensory; Renova more technical.",
      },
      {
        q: "Can we each ask for different pressure?",
        a: "Yes, each therapist adjusts with her own person.",
      },
    ],
  },

  renace: {
    tagline: "65 minutes for two, with a TENS session and a back scrub.",
    intro: [
      "Renace is the only experience for two that includes a TENS session — low-intensity electrical stimulation — alongside a deep-tissue or relaxing massage, a back scrub, a bioenergetic massage with Chinese spheres, foot reflexology and aromatherapy.",
      "It includes two glasses of wine or infusion per person, not one. It's among the fullest experiences below the premium range.",
    ],
    forWhom:
      "For two people with real muscle tension who want more than a relaxation session.",
    benefits: [
      "TENS session included — unique in the For Two catalog",
      "Back scrub and Chinese spheres",
      "Two drinks per person",
      "Remarkably complete for its price range",
    ],
    session:
      "Massage, TENS applied to the loaded area, scrub, spheres and reflexology, with the drinks running through the close.",
    faqs: [
      {
        q: "What is TENS?",
        a: "A device that applies gentle electrical impulses to the muscle through electrodes. It feels like tingling or vibration; you control the intensity.",
      },
      {
        q: "Are there cases where it can't be used?",
        a: "Yes. It isn't applied to people with a pacemaker, during pregnancy, with epilepsy, or over broken skin. Let us know beforehand and the session runs without that component.",
      },
      {
        q: "Is it painful?",
        a: "No. If you feel any discomfort, the intensity is lowered or it's removed.",
      },
    ],
  },

  esencia: {
    tagline: "70 minutes for two, with an artisan soy candle as the aromatherapy.",
    intro: [
      "Esencia is the experience for two built around scent. The aromatherapy comes from an artisan soy candle lit as the session begins, and the rest is a relaxing massage, hot stones, foot reflexology, and a glass of wine or an infusion.",
      "It's the most chosen for proposals, anniversaries and dates where the atmosphere matters as much as the massage.",
    ],
    forWhom:
      "For a special occasion as a couple, when you want the room to feel different from the moment you walk in.",
    benefits: [
      "An artisan soy candle as the source of aromatherapy",
      "Hot stones and foot reflexology",
      "70 minutes in a private room",
      "A glass of wine or an infusion for each of you",
    ],
    session:
      "The candle is lit, the room set with low light, and the session runs without breaks through to the reflexology and the closing drink.",
    faqs: [
      {
        q: "Does one of us take the candle home?",
        a: "In Esencia the candle is part of the room's atmosphere. If you'd like a candle to take with you, Aroma Zen (single person) includes one as a gift.",
      },
      {
        q: "Can the room be decorated for a special occasion?",
        a: "Mention it when booking on WhatsApp and we'll see what can be arranged.",
      },
      {
        q: "How is it different from Relax?",
        a: "Ten more minutes and the artisan candle in place of the standard aromatherapy.",
      },
    ],
  },

  deluxe: {
    tagline: "90 minutes for two, with an express facial cleanse included.",
    intro: [
      "Deluxe is where the premium range for two begins. Ninety minutes with relaxing and deep-tissue massage — both, not one or the other — hot stones, foot reflexology, aromatherapy, an express facial cleanse with a collagen mask, and a glass of wine or an infusion.",
      "It's the first experience in the For Two catalog that includes facial work, and that changes how you leave.",
    ],
    forWhom:
      "For an important date as a couple, or for two people who want body and face settled on the same day.",
    benefits: [
      "Relaxing and deep-tissue massage in the same session",
      "Express facial cleanse with a collagen mask",
      "Hot stones, reflexology and aromatherapy",
      "90 minutes in a private room",
    ],
    session:
      "A long body block with stones and reflexology, and a facial block at the end for both of you, with your drink to close.",
    faqs: [
      {
        q: "Is the facial for both people?",
        a: "Yes, you both get the express facial cleanse.",
      },
      {
        q: "How is it different from Royale?",
        a: "Royale runs 120 minutes, swaps the express facial for a hyaluronic acid mask, and adds a back scrub and hand hydration.",
      },
      {
        q: "How far ahead should we book?",
        a: "It's a 90-minute block with two therapists, so it's worth booking several days ahead, especially for weekends.",
      },
    ],
  },

  royale: {
    tagline: "Two hours for two, with a hyaluronic acid mask and a back scrub.",
    intro: [
      "Royale is 120 minutes of continuous work for two people: a full-body relaxing or deep-tissue massage, hot stones, a back scrub, a hyaluronic acid facial mask, foot reflexology, hand hydration and aromatherapy.",
      "What sets it apart is the level of detail: the hand hydration, for instance, is a small gesture almost nobody includes and one that people remember.",
    ],
    forWhom:
      "For an important anniversary, a honeymoon, or a big gift as a couple.",
    benefits: [
      "Two full hours for two people",
      "Hyaluronic acid facial mask",
      "Back scrub and hand hydration",
      "Full-body massage with hot stones",
    ],
    session:
      "A long, ordered sequence: full body, scrub, facial with settling time for the mask, reflexology, and the hand detail at the end.",
    faqs: [
      {
        q: "Does it all happen in the same room?",
        a: "Yes, you both stay together in the private room for the whole experience.",
      },
      {
        q: "Does it include a drink?",
        a: "Royale centres on the body and facial protocol. If you want the glass of wine included alongside a final rest, Supreme is the option.",
      },
      {
        q: "Can it be given as a gift?",
        a: "Yes. Message us on WhatsApp and we'll arrange the gift for the date you need.",
      },
    ],
  },

  supreme: {
    tagline: "150 minutes for two: the fullest experience in the catalog.",
    intro: [
      "Supreme is the longest experience we offer. Two and a half hours for two people, with a full-body relaxing or deep-tissue massage, hot stones, a back scrub, a hyaluronic acid facial mask, foot reflexology, body hydration and aromatherapy from an artisan soy candle.",
      "What separates it from Royale isn't only the extra half hour: it includes a final rest in the couples room with a glass of wine or an infusion, with no rush to clear the table. That close is what people describe when they recommend it.",
    ],
    forWhom:
      "For the big occasion: a milestone anniversary, a proposal, or a gift you want remembered.",
    benefits: [
      "150 minutes — the longest session in the catalog",
      "A final rest in the couples room with a drink",
      "Artisan soy candle as the aromatherapy",
      "Full body and facial protocol",
    ],
    session:
      "A two-and-a-half-hour journey that ends with the two of you seated, unhurried, in the same private room.",
    faqs: [
      {
        q: "Is that a lot of time?",
        a: "It's an afternoon. It's worth booking with nothing scheduled immediately afterwards.",
      },
      {
        q: "How much notice does it need?",
        a: "It's the longest block in the diary with two therapists: book well ahead, especially for weekends and peak dates.",
      },
      {
        q: "Can we ask for special decoration?",
        a: "Mention it on WhatsApp when booking and we'll see what can be arranged for the date.",
      },
    ],
  },

  "facial-express-2p": {
    tagline: "70 minutes for two, with an express facial cleanse and two drinks each.",
    intro: [
      "Facial Express for Two settles body and face for two people in 70 minutes: massage, hot stones, an express facial cleanse with a collagen mask, foot reflexology, aromatherapy, and two glasses of wine or infusion each.",
      "It's the way into the experiences for two with a facial component.",
    ],
    forWhom:
      "For two people with an event coming up, or who simply want to leave looking better as well as loosened up.",
    benefits: [
      "Express facial cleanse for both of you",
      "Hot stones and reflexology included",
      "Two drinks per person",
      "70 minutes in a private room",
    ],
    session:
      "A body block with stones, a facial block with the collagen mask, and a close with reflexology and drinks.",
    faqs: [
      {
        q: "How is it different from Deluxe?",
        a: "Deluxe runs 90 minutes and includes both relaxing and deep-tissue massage; this version is shorter and more direct.",
      },
      {
        q: "And from Facial Full Body for Two?",
        a: "Full Body runs 90 minutes, swaps the mask for hyaluronic acid, and adds a back scrub and hand hydration.",
      },
      {
        q: "Is it suitable for sensitive skin?",
        a: "The express cleanse is gentle, but do tell us if you use acids or retinol or have had a recent procedure.",
      },
    ],
  },

  "facial-full-body-2p": {
    tagline: "90 minutes for two, with a hyaluronic acid mask and hand hydration.",
    intro: [
      "The full version of the facial for two: full-body massage, hot stones, a back scrub, a hyaluronic acid mask, foot reflexology, hand hydration, aromatherapy, and two glasses of wine or infusion each.",
      "Ninety minutes covering body, face and detail, in a private room for the two of you.",
    ],
    forWhom:
      "For two people who want the fullest facial protocol without going to the two hours of Royale.",
    benefits: [
      "Hyaluronic acid mask for both of you",
      "Back scrub and hand hydration",
      "Full-body massage with hot stones",
      "Two drinks per person",
    ],
    session:
      "Full body, scrub, facial with settling time for the mask, reflexology and hand hydration at the end.",
    faqs: [
      {
        q: "How is it different from Royale?",
        a: "Royale runs 120 minutes instead of 90. The protocol is very similar; the main difference is the time given to the body massage.",
      },
      {
        q: "Does the hyaluronic acid mask irritate?",
        a: "It doesn't usually — it's a hydrating mask. Still, mention it if your skin is reactive.",
      },
      {
        q: "Can we choose different massages?",
        a: "Yes, each person states their preference at the start.",
      },
    ],
  },

  "coco-premium-2p": {
    tagline: "The coconut scrub of Coco Premium, now for two.",
    intro: [
      "Coco Premium for Two brings the most aromatic single session in the catalog into the two-table room: a relaxing or deep-tissue massage, hot stones, a coconut scrub, foot reflexology, aromatherapy, and two glasses of wine or infusion.",
      "The coconut scent fills the room for the whole session and the skin is noticeably softer afterwards.",
    ],
    forWhom:
      "For two people who want a strongly sensory experience rather than a therapeutic massage.",
    benefits: [
      "Coconut scrub for both of you",
      "Hot stones and aromatherapy",
      "Foot reflexology included",
      "Two drinks per person",
    ],
    session:
      "Massage, stones, coconut scrub, reflexology, and a few final minutes with your drink in the same room.",
    faqs: [
      {
        q: "Does the scent stay on the skin?",
        a: "Yes, for several hours. Most people like it; if you'd prefer something neutral, Relax is the equivalent alternative.",
      },
      {
        q: "Is the scrub full body?",
        a: "It covers the back of the body and the limbs.",
      },
      {
        q: "Is it suitable for sensitive skin?",
        a: "Tell us beforehand: we can use less product or skip the scrub on specific areas.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // IN-HOME
  // ─────────────────────────────────────────────────────────────────────
  "masaje-domicilio-1-hora": {
    tagline: "One hour of massage at your home, hotel or office, table included.",
    intro: [
      "Your therapist arrives with a professional table, towels and oils, sets up in whatever space you have available, and works a full hour. Afterwards she packs everything away and nothing is left behind but the scent.",
      "You can choose a relaxing, deep-tissue, sports, therapeutic or holistic massage, or foot reflexology. Travel to Miraflores is included; for San Borja, Surco, San Isidro and Barranco there's a S/ 30 surcharge.",
    ],
    forWhom:
      "For anyone who can't or would rather not go out: back from a trip, with children at home, staying at a hotel, or simply not wanting to drive after a massage.",
    benefits: [
      "Professional table, towels and oils included",
      "Six techniques to choose from, reflexology among them",
      "Travel included within Miraflores",
      "Works for a home, a hotel or an office",
    ],
    session:
      "Your therapist arrives a few minutes early, sets up the table wherever you point, and the session runs exactly as it would at the spa.",
    faqs: [
      {
        q: "What do I need to have at home?",
        a: "A space of about two by two metres and a socket nearby if you want music. Nothing else: the table and all the materials are included.",
      },
      {
        q: "Which districts do you cover?",
        a: "Travel is included for Miraflores. San Borja, Surco, San Isidro and Barranco carry a S/ 30 surcharge. For other districts, message us on WhatsApp and we'll look into it.",
      },
      {
        q: "How far ahead should I book?",
        a: "At least 24 hours, so we can arrange the travel and the materials.",
      },
    ],
  },

  "masaje-domicilio-2-horas": {
    tagline: "Two hours of in-home massage, with table and materials included.",
    intro: [
      "The long version of the in-home service. Two hours allow the whole body to be worked without rushing any area, or the time to be split between two people in the same household if you prefer.",
      "Same as the one-hour session: professional table, towels and oils included, six techniques to choose from, travel included within Miraflores, and a S/ 30 surcharge for San Borja, Surco, San Isidro and Barranco.",
    ],
    forWhom:
      "For a genuinely complete session at home, or to split the time between two people without the therapist having to come back another day.",
    benefits: [
      "Two hours of work, with no area rushed",
      "Can be split between two people at the same address",
      "Professional table and materials included",
      "Six techniques to choose from",
    ],
    session:
      "The table is set up, the session runs long and unbroken, and all the materials are packed away at the end.",
    faqs: [
      {
        q: "Can I split the two hours between two people?",
        a: "Yes, that's a common choice: an hour each, with the same therapist and no extra travel charge.",
      },
      {
        q: "What if there are two of us and we want the massage at the same time?",
        a: "That needs two therapists and two tables. Message us on WhatsApp and we'll quote it.",
      },
      {
        q: "Is the S/ 30 surcharge per session or per person?",
        a: "It's a single travel surcharge per visit, not per person.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // PROGRAMS
  // ─────────────────────────────────────────────────────────────────────
  "programa-relajante-5-sesiones": {
    tagline: "Five one-hour relaxing massages, at under S/ 50 each.",
    intro: [
      "The relaxing program exists because a single massage is enjoyable, but five in a row are noticeable. It's five 60-minute relaxing massage sessions, used at whatever pace suits you.",
      "The per-session price drops considerably against buying them separately, and they don't expire from one month to the next: you arrange each appointment on WhatsApp when you need it.",
    ],
    forWhom:
      "For anyone who already knows massage does them good and wants to make it a habit without paying single-session prices.",
    benefits: [
      "Five 60-minute sessions",
      "A per-session price well below the individual one",
      "Used at whatever pace you need",
      "Valid in San Borja and Miraflores",
    ],
    session:
      "Each session is a full-body relaxing massage of one hour, exactly like the individual one.",
    faqs: [
      {
        q: "Do they expire?",
        a: "Message us on WhatsApp to confirm the program's current conditions before buying it.",
      },
      {
        q: "Can I give one of the sessions away?",
        a: "Ask us: in general the program is personal, but we can look at your case.",
      },
      {
        q: "Can I change the type of massage in one of the sessions?",
        a: "The relaxing program covers relaxing massage. If you want deep-tissue or therapeutic work, the Muscle Therapy Program is the right one.",
      },
    ],
  },

  "programa-relajante-10-sesiones": {
    tagline: "Ten one-hour relaxing massages, at a little over S/ 40 each.",
    intro: [
      "The long version of the relaxing program: ten 60-minute sessions, at the lowest per-session price in the whole catalog.",
      "It's the choice of people who come every couple of weeks as a matter of habit and prefer to settle the year in one go.",
    ],
    forWhom:
      "For regular clients, and for anyone who wants to keep a wellbeing routine going for several months.",
    benefits: [
      "Ten 60-minute sessions",
      "The lowest per-session price in the catalog",
      "Used at whatever pace you need",
      "Valid at both locations",
    ],
    session:
      "Each session is a full-body relaxing massage of one hour.",
    faqs: [
      {
        q: "Is it worth it over the 5-session one?",
        a: "Per session, yes: it's the lowest rate. The real question is whether you'll use all ten.",
      },
      {
        q: "Can I pay in instalments?",
        a: "Message us on WhatsApp and we'll go over the available payment options.",
      },
      {
        q: "Can the whole family use it?",
        a: "Ask us before buying: the conditions for shared use depend on the current program.",
      },
    ],
  },

  "programa-terapia-muscular-5-sesiones": {
    tagline: "Five sessions, choosing between deep tissue, therapeutic, hot stones or bamboo.",
    intro: [
      "This program is built for real muscle tension, not occasional relaxation. Each of the five sessions can be deep tissue, therapeutic, hot stones or bamboo therapy: you choose on the day, according to how you arrive.",
      "It's the most sensible way to work on a loaded area, because the effect of a deep-tissue massage holds far better with continuity than with single sessions months apart.",
    ],
    forWhom:
      "For anyone with an area that keeps loading up again: an office neck, a driver's lower back, shoulders from training.",
    benefits: [
      "Four techniques to choose from at each session",
      "Continuity, which is what makes the difference with chronic tension",
      "A per-session price below the individual one",
      "Valid in San Borja and Miraflores",
    ],
    session:
      "Each visit is a full 60-minute session using the technique you choose that day.",
    faqs: [
      {
        q: "How often should I use them?",
        a: "For persistent tension, every one or two weeks at first, then spacing them out.",
      },
      {
        q: "Can I alternate techniques?",
        a: "Yes, that's exactly the idea: deep tissue one week, stones the next, depending on how you feel.",
      },
      {
        q: "Does it replace physiotherapy?",
        a: "No. It's a wellbeing service. If you have an injury or persistent pain, consult a health professional.",
      },
    ],
  },

  "programa-terapia-muscular-10-sesiones": {
    tagline: "Ten muscle therapy sessions, choosing the technique at each visit.",
    intro: [
      "The long version of the muscle therapy program: ten 60-minute sessions, each with whichever technique you need that day — deep tissue, therapeutic, hot stones or bamboo therapy.",
      "It's the program chosen by people carrying a constant muscular load from work or sport who want to keep it under control over several months.",
    ],
    forWhom:
      "For sustained muscular load over time: physical work, regular training, or long hours at a desk.",
    benefits: [
      "Ten sessions with the technique of your choice",
      "Designed for medium-term maintenance",
      "A per-session price below the individual one",
      "Valid at both locations",
    ],
    session:
      "Each visit is a full 60-minute session with the technique you choose.",
    faqs: [
      {
        q: "Is it worth it over the 5-session one?",
        a: "If your load is constant, yes: it lowers the per-session price and covers several months.",
      },
      {
        q: "Can I use it at both locations?",
        a: "Yes, it's valid in both San Borja and Miraflores.",
      },
      {
        q: "Are there validity conditions?",
        a: "Message us on WhatsApp to confirm the current conditions before buying it.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // LASHES & BROWS
  // ─────────────────────────────────────────────────────────────────────
  "lifting-de-pestanas": {
    tagline: "Lifts your natural lashes from the root, with henna tinting included.",
    intro: [
      "A lash lift curls and raises your natural lash from the base, with no extensions and no glue. The result is a more open look using your own lashes, and the henna tint darkens them so they read fuller.",
      "The session takes an hour and needs no daily upkeep: there's nothing to touch up — the lash returns to its own shape as it renews itself.",
    ],
    forWhom:
      "For anyone who wants to stop using a lash curler or mascara every day, and for anyone who prefers a natural result over extensions.",
    benefits: [
      "No extensions, no glue",
      "Henna tinting included",
      "Zero daily maintenance",
      "A result that lasts for weeks",
    ],
    session:
      "You lie down with your eyes closed throughout: the lower lid is protected, the lash is shaped over a silicone shield, and the tint is applied at the end.",
    faqs: [
      {
        q: "How long does the effect last?",
        a: "Usually between four and six weeks, depending on your lashes' natural cycle.",
      },
      {
        q: "Can I get my face wet afterwards?",
        a: "It's best to avoid water, steam and eye make-up for the first 24 hours.",
      },
      {
        q: "Can it be done if I wear contact lenses?",
        a: "Yes, but it's better to come without them or take them out before we start.",
      },
    ],
  },

  "planchado-de-cejas": {
    tagline: "Aligns and defines the brow, taming stray hairs.",
    intro: [
      "Brow lamination aligns the hairs in a single direction and sets them, which makes the brow look fuller, tidier and clearly shaped without needing make-up.",
      "It's a short session, twenty-five minutes, and the result shows from day one.",
    ],
    forWhom:
      "For brows with stray hairs or hair growing in several directions, and for anyone who wants to stop combing them every morning.",
    benefits: [
      "A session of just 25 minutes",
      "A fuller, tidier brow without make-up",
      "Visible result from day one",
      "Can be combined with a lash lift",
    ],
    session:
      "The area is cleansed, the smoothing product applied, the brow combed into the desired direction and set.",
    faqs: [
      {
        q: "How long does it last?",
        a: "Around four to six weeks, depending on your hair growth.",
      },
      {
        q: "Does it include shaping or waxing?",
        a: "Lamination aligns and sets. If you also want shaping, mention it when booking so we can allow the time.",
      },
      {
        q: "Can I have it together with a lash lift?",
        a: "Yes, and it works out cheaper: the Lash Lift + Tint + Brow Lamination package combines both in 90 minutes.",
      },
    ],
  },

  "lifting-tinturado-planchado-cejas": {
    tagline: "Lashes and brows settled in a single 90-minute appointment.",
    intro: [
      "The complete eye package: lash lift, tinting and brow lamination in one 90-minute appointment.",
      "Buying it together costs considerably less than the two sessions separately, and the result looks more harmonious because our aesthetician works lashes and brows as a whole rather than each on its own.",
    ],
    forWhom:
      "For anyone who wants their whole look settled before an event, a trip, or simply for the next couple of months.",
    benefits: [
      "Lift, tint and lamination in a single appointment",
      "Cheaper than booking the sessions separately",
      "A result designed as a whole",
      "Weeks of effect with no daily upkeep",
    ],
    session:
      "First the lash work with your eyes closed, then the brow lamination and setting.",
    faqs: [
      {
        q: "How long does the result last?",
        a: "Between four and six weeks, depending on your growth cycle.",
      },
      {
        q: "Can I wear make-up the same day?",
        a: "It's better to wait 24 hours before applying make-up to eyes and brows.",
      },
      {
        q: "Is it uncomfortable to keep my eyes closed for 90 minutes?",
        a: "Most people end up asleep. You can ask for a break whenever you want.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // FACIALS
  // ─────────────────────────────────────────────────────────────────────
  "limpieza-facial-express": {
    tagline: "30 minutes of facial cleansing to clear impurities without taking your afternoon.",
    intro: [
      "A short, effective facial cleanse: make-up removal, deep cleansing, gentle exfoliation and extraction where needed. Half an hour that fits any schedule.",
      "It isn't an intensive treatment and doesn't pretend to be: it's the upkeep your skin appreciates every so often, especially with Lima's dust and humidity.",
    ],
    forWhom:
      "For regular upkeep, for skin with blackheads or congestion, and for anyone who has never had a facial and wants to start with something short.",
    benefits: [
      "Just 30 minutes",
      "Deep cleansing with extraction where appropriate",
      "The most affordable facial in the catalog",
      "A good base before an event",
    ],
    session:
      "Make-up removal, cleansing, gentle exfoliation, extraction if needed, and a closing toner.",
    faqs: [
      {
        q: "Does my face end up red?",
        a: "It can look a little flushed for a while if there was extraction, especially on sensitive skin. It usually settles within a couple of hours.",
      },
      {
        q: "How often is it worth having?",
        a: "Once a month is the usual rhythm for combination or oily skin.",
      },
      {
        q: "Does it include a mask?",
        a: "The express version doesn't. If you want one, look at the Lifting Mask Facial, the Mud Mask Cleanse or the Premium Glow Facial.",
      },
    ],
  },

  "facial-glow-premium-solo": {
    tagline: "Cleansing, exfoliation, a collagen mask and LED light in 50 minutes.",
    intro: [
      "The fullest facial in the line: deep cleansing, exfoliation, a collagen mask and an LED light session to close.",
      "The LED light is what sets it apart from the other facials in the catalog, and it's also what makes the luminous-skin effect more noticeable at the end.",
    ],
    forWhom:
      "For dull or tired skin, and for anyone who wants a visible result the same day without resorting to invasive procedures.",
    benefits: [
      "Includes an LED light session",
      "Collagen mask",
      "Full cleansing and exfoliation",
      "50 minutes — the fullest facial without a massage",
    ],
    session:
      "Cleansing, exfoliation, extraction where appropriate, a mask with settling time, and a close with LED light.",
    faqs: [
      {
        q: "What does the LED light do?",
        a: "It's a low-intensity light therapy used in cosmetics to improve the look of the skin. It's painless and needs no recovery time.",
      },
      {
        q: "Can I go straight out afterwards?",
        a: "Yes. Sunscreen is advisable, and we'll apply it at the end if you ask.",
      },
      {
        q: "Can it be combined with a massage?",
        a: "Yes: Glow Facial, Glow Facial Plus and Glow Facial Premium already combine body massage with facial work.",
      },
    ],
  },

  "facial-mascarilla-lifting": {
    tagline: "A firming mask for dull skin or skin that has lost elasticity.",
    intro: [
      "A short facial built around the mask: a preliminary cleanse and then a firming mask left to work on the face for a few minutes.",
      "It's designed for skin that looks tired or has lost its tone, and it works well as preparation before an event when there isn't time for a long protocol.",
    ],
    forWhom:
      "For dull skin or skin that has lost firmness, and for anyone who wants a quick effect before an occasion.",
    benefits: [
      "A firming mask as the centre of the session",
      "Just 30 minutes",
      "Visible effect at the end",
      "Good preparation before an event",
    ],
    session:
      "Cleansing, application of the mask, rest with the face covered, and removal with a closing moisturiser.",
    faqs: [
      {
        q: "How long does the effect last?",
        a: "The smoother look usually holds for a few days. It's a cosmetic treatment, not a permanent one.",
      },
      {
        q: "Does it include extraction?",
        a: "No. If you need extraction, the Express Facial Cleanse or the Mud Mask one are the right choices.",
      },
      {
        q: "Is it suitable for oily skin?",
        a: "It works, but for oily or congested skin the mud mask usually gives a better result.",
      },
    ],
  },

  "facial-mascarilla-barro": {
    tagline: "A facial cleanse with a mud mask, for oily or congested skin.",
    intro: [
      "A full facial cleanse finishing with a mud mask. Mud absorbs oil and helps decongest the pore, which makes it the natural choice for combination or oily skin.",
      "Half an hour, with cleansing, extraction if needed, and the mask working at the end.",
    ],
    forWhom:
      "For oily or combination skin, or skin with congested pores and blackheads.",
    benefits: [
      "Mud mask with a purifying effect",
      "Includes cleansing and extraction where appropriate",
      "30 minutes",
      "A good monthly routine for oily skin",
    ],
    session:
      "Make-up removal, cleansing, exfoliation, extraction if needed, and the mud mask with settling time before removal.",
    faqs: [
      {
        q: "Does it dry out the skin?",
        a: "Mud absorbs oil, so on dry skin it can feel tight. In that case the lifting mask or the Premium Glow Facial suit better.",
      },
      {
        q: "How often can it be done?",
        a: "Once a month is usual for oily skin.",
      },
      {
        q: "Can I wear make-up afterwards?",
        a: "Better to wait a few hours, especially if there was extraction.",
      },
    ],
  },
};

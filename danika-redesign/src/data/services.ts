import {
  Flame, Droplets, Waves, Siren, Search, Wrench, ThermometerSnowflake, Gauge, Zap, PlugZap,
  Lightbulb, BatteryCharging, ShieldCheck, Cable, ClipboardCheck, Toilet,
  type LucideIcon,
} from 'lucide-react';
import { orig } from './site';

export type Problem = { title: string; text: string; cta: string; href: string; icon: LucideIcon };

/** "What's going on at your place?" — all eight categories from the original homepage. */
export const problems: Problem[] = [
  { title: 'No Hot Water', text: 'Failed element, pilot, thermostat or a tank at the end of its life.', cta: 'Water heater service', href: orig('/water-heaters-everett-wa/'), icon: ThermometerSnowflake },
  { title: 'Clogged or Slow Drain', text: 'Kitchen grease, bathroom hair, or roots in the main line.', cta: 'Drain cleaning', href: orig('/drain-cleaning-everett-wa/'), icon: Droplets },
  { title: 'Sewer Smell or Backup', text: 'Gurgling toilets and a floor drain that fills up need a camera, not a guess.', cta: 'Sewer repair', href: orig('/sewer-repair-everett-wa/'), icon: Waves },
  { title: 'Burst Pipe or Active Leak', text: 'Shut the main valve, then call. We dispatch around the clock.', cta: '24/7 emergency plumber', href: orig('/24-hour-emergency-plumber-everett-wa/'), icon: Siren },
  { title: 'Hidden Leak or High Water Bill', text: 'A meter that spins with every tap closed usually means a leak you cannot see.', cta: 'Leak detection', href: orig('/water-leak-detection-everett-wa/'), icon: Search },
  { title: 'Low Water Pressure', text: 'Corroded galvanized pipe, a failing pressure valve, or a main line leak.', cta: 'Repiping and water lines', href: orig('/repiping-everett-wa/'), icon: Gauge },
  { title: 'Running or Leaking Toilet', text: 'Worn fill valves, flappers and wax seals are quick, clean fixes.', cta: 'Toilet repair', href: orig('/toilet-installation-repair-everett-wa/'), icon: Toilet },
  { title: 'Gas Line Work', text: 'New range, dryer or water heater hookups, pressure tested to code.', cta: 'Gas line plumber', href: orig('/gas-line-installation-everett/'), icon: Flame },
];

export type ProblemRow = Omit<Problem, 'icon'> & { emergency?: boolean };

/** Electrical counterpart to `problems`. Links go to existing electrical pages; copy makes no availability or technical claims. */
export const electricalProblems: ProblemRow[] = [
  { title: 'Electrical Emergency', text: 'Sparking outlets, a burning smell, or a dead circuit after a leak.', cta: 'Emergency electrician', href: orig('/emergency-electrician-services/'), emergency: true },
  { title: 'Breaker Keeps Tripping', text: 'A breaker that trips again and again needs an electrician to find out why.', cta: 'Electrical repair', href: orig('/electrical-repair-services/') },
  { title: 'Dead Outlets or Switches', text: 'Outlets or switches that stopped working, diagnosed and repaired.', cta: 'Electrical repair', href: orig('/electrical-repair-services/') },
  { title: 'Flickering Lights', text: 'Lights that flicker or dim are worth having checked.', cta: 'Electrical repair', href: orig('/electrical-repair-services/') },
  { title: 'Panel Upgrade', text: 'Often the first step before an EV charger or an electric tankless water heater.', cta: 'Panel upgrades', href: orig('/electrical-panel-upgrade-services/') },
  { title: 'EV Charger Installation', text: 'A home charger installed by a licensed electrician.', cta: 'EV chargers', href: orig('/ev-charger-installation-services/') },
];

export type Service = { title: string; text?: string; href: string; icon: LucideIcon };

export const plumbingServices: Service[] = [
  { title: 'Emergency Plumbing', text: 'Burst pipes, sewer backups, failed water heaters and major leaks, handled around the clock.', href: orig('/24-hour-emergency-plumber-everett-wa/'), icon: Siren },
  { title: 'Drain Cleaning', text: 'Cable machines sized to the line, with hydro jetting after a camera inspection when needed.', href: orig('/drain-cleaning-everett-wa/'), icon: Droplets },
  { title: 'Water Heaters', text: 'Gas and electric tank units, tankless systems, plus venting, gas supply and expansion tank work.', href: orig('/water-heaters-everett-wa/'), icon: Flame },
  { title: 'Sewer Repair', text: 'Camera inspection, spot repairs and full replacement, explained before work begins.', href: orig('/sewer-repair-everett-wa/'), icon: Waves },
  { title: 'Leak Detection', text: 'Hidden leaks pinpointed first, then fixed by our pipe repair service.', href: orig('/water-leak-detection-everett-wa/'), icon: Search },
  { title: 'Pipe Repair', text: 'We repair what can be repaired and replace what is at the end of its life.', href: orig('/pipe-repair-everett/'), icon: Wrench },
];

/** Remaining original plumbing services, kept so nothing is lost from the original site. */
export const morePlumbing = [
  { title: 'Hydro Jetting', href: orig('/hydro-jet-service-everett/') },
  { title: 'Repiping', href: orig('/repiping-everett-wa/') },
  { title: 'Water Line Repair', href: orig('/water-line-replacement-everett-wa/') },
  { title: 'Tankless Water Heaters', href: orig('/tankless-water-heaters-everett-wa/') },
  { title: 'Gas Line Services', href: orig('/gas-line-installation-everett/') },
  { title: 'Sump Pumps', href: orig('/sump-pump-repair-installation-everett/') },
  { title: 'French Drains', href: orig('/french-drain-installation-everett/') },
  { title: 'Faucets', href: orig('/faucet-installation-repair-everett-wa/') },
  { title: 'Showers', href: orig('/shower-repair-installation-everett-wa/') },
  { title: 'Toilets', href: orig('/toilet-installation-repair-everett-wa/') },
  { title: 'Garbage Disposals', href: orig('/garbage-disposal-repair-everett-wa/') },
  { title: 'Remodeling Plumbing', href: orig('/plumbing-remodeling/') },
  { title: 'Commercial Plumbing', href: orig('/commercial-plumbing-everett/') },
  { title: 'Frozen Pipe Repair', href: orig('/frozen-pipes-everett-repair/') },
];

export const electricalServices: Service[] = [
  { title: 'Electrical Panel Upgrades', text: 'Often the first step before an EV charger or an electric tankless water heater.', href: orig('/electrical-panel-upgrade-services/'), icon: Zap },
  { title: 'EV Charger Installation', href: orig('/ev-charger-installation-services/'), icon: BatteryCharging },
  { title: 'Electrical Repair', href: orig('/electrical-repair-services/'), icon: PlugZap },
  { title: 'Emergency Electrician', text: 'Sparking outlets, a burning smell, or a dead circuit after a leak.', href: orig('/emergency-electrician-services/'), icon: Siren },
  { title: 'Generator Installation', href: orig('/generator-installation-services/'), icon: Cable },
  { title: 'Lighting Installation', href: orig('/lighting-installation-everett-wa/'), icon: Lightbulb },
  { title: 'Whole-Home Rewiring', href: orig('/electrical-rewiring-services/'), icon: ShieldCheck },
  { title: 'Safety Inspections', href: orig('/electrical-safety-inspection-services/'), icon: ClipboardCheck },
];

/** Customer journey for plumbing and electrical visits alike. Each line restates what the site already promises. */
export const processSteps = [
  { title: 'Talk to a real person', text: 'A person at our Everett office answers and asks what is going on.' },
  { title: 'Schedule a visit', text: 'We book the soonest available slot for your plumbing or electrical visit.' },
  { title: 'Get a professional diagnosis', text: 'We find the cause first, before anything gets replaced.' },
  { title: 'Approve the written estimate', text: 'Your options and the price, in writing, before work starts.' },
  { title: 'Work is completed and tested', text: 'We test the fix with you watching, clean up, and back it with our one-year parts and labor warranty.' },
];

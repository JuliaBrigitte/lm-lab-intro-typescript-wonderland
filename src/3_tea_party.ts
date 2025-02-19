import { endAdventure } from '..';
import { attendAnotherTeaParty } from './3_tea_party2';
import { askQuestion, clear, print } from '../console';

const drinks = ['Coffee', 'Tea', 'Water', 'Lemonade'] as const;
type DrinkType = typeof drinks[number];

interface Drink {
	type: DrinkType;
	poured: boolean;
}

interface Seat {
	drink: Drink;
}

interface Table {
	seats: Array<Seat>;
}

export function attendATeaParty() {
	clear(true);
	print('The Mad Hatter 🎩 welcomes you to his tea party ☕ ');

	print(`He and the March Hare set the table...`);

	const drinks = setTheTable();

	if (!drinks || !drinks.seats || drinks.seats.length <= 0) {
		print(`... but something went very wrong with the table. 😱`);
		return endAdventure();
	}

	print(`... they set ${drinks.seats.length} place(s) for their guests.`);

	if (drinks.seats.length < 3) {
		print(`😱 That's not enough seats! The party is cancelled...`);
		return endAdventure();
	}

	let properlySet = true;

	drinks.seats.forEach((seat) => {
		if (!seat.drink.poured || seat.drink.type !== 'Tea') {
			properlySet = false;
		}
	});

	if (!properlySet) {
		print(
			`😱 Uhoh! This isn't a proper tea party! Every seat must have a fully poured cup of tea.`
		);
		return endAdventure();
	}

	print(
		`🥳 Every seat had a lovely cup of tea, and a great time was had by all. 🥳 `
	);
	print(`🏑 Time for another tea party! 🏑`);
	return askQuestion('Press ENTER to continue! ', attendAnotherTeaParty);
}

function setTheTable(): Table {
	const table: Table = { seats: [] };

	for (let i = 0; i < 4; i++) {
		table.seats.push({
			drink: {
				type: 'Tea',
				poured: true,
			},
		});
	}
	return table;
}

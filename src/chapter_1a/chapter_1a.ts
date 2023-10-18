import { endAdventure } from '../..';
import { meetTheCheshireCat } from '../chapter_2/chapter_2_cheshire_cat';
import { clear, print, askQuestion, pressAKeyToContinue } from '../ui/console';
import { parseHoleInput } from '../ui/parse_input';

interface MagicConsumable {
    name: string,
    verb: string,
    effect: (height: number) => number,
    quantity: number
};

const heightInFeetAndInches = (height: number): string => {
    return `${Math.floor(height / 12)}' and ${Math.floor(height % 12)}"`;
}

export function letThemEatCake() {

    clear(true);


    const cake: MagicConsumable = { name: "cake", verb: "eat", effect: (height: number) => Math.floor(height * 2), quantity: 3 };
    const bottleOfFluid: MagicConsumable = { name: "strange bottle of fluid", verb: "drink", effect: (height: number) => Math.max(1, Math.round(height / 1.5)), quantity: 3 };

    const consumables: Array<MagicConsumable> = [cake, bottleOfFluid];

    let height = 72;
    const requiredHeight = 3 * 12 + 7;

    cakeMenu(consumables, height, requiredHeight);
};

export function cakeMenu(consumables: MagicConsumable[], height: number, requiredHeight: number): void {

    const bottomsUp = (response: string) => {

        const index = Number(response)-1;

        if (!isNaN(index) && index < consumables.length && index >= 0) {

            const item = consumables[index];
            if (item.quantity > 0) {
                height = item.effect(height);
                item.quantity--;

                print(`You ${consumables[index].verb} from the ${consumables[index].name}!`);
                print(`*Poof*`);

                if (consumables.reduce((acc, cur) => acc + cur.quantity, 0) <= 0) {
                    print(`There are no more magic consumables left and you are still the wrong size for the door!`);
                    return pressAKeyToContinue(() => endAdventure());
                    
                }
                if (height === requiredHeight) {
                    print("You are exactly the right height, you step through the door and return to your normal size!")
                    return pressAKeyToContinue(() => meetTheCheshireCat());
                };
            } else {
                print(`The ${consumables[index].name} is already finished!`);
            }
        } else {
            print("Invalid Output!");
        }
        return pressAKeyToContinue(() => cakeMenu(consumables, height, requiredHeight));
    };

    clear(true);
    print(`You are in a room with a small door, too small to fit through! To get through the door you need to be exactly ${heightInFeetAndInches(requiredHeight)} tall!`);
    print(`You are ${heightInFeetAndInches(height)} tall!`);

    print(`Options are:`);

    consumables.forEach((consumable, index) => {
        print(`${index + 1}. ${consumable.verb} from the ${consumable.name} (${consumable.quantity} doses remain).`);
    });

    askQuestion("Which do you want to do?", bottomsUp);
};

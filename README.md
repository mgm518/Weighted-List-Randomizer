# Weighted-List-Randomizer

This coding project implements two expanding loot table list randomizers using individual weights to shift the probability of certain items appearing at the top of each list. 

The idea is centered around selecting outfits and accessories from the game Blade and Soul.  All items are stored in a JSON file with a given list of attributes.  The items follow the format below:

```
"list1": [{ "name": "", "weight": 0, "active": true, "url": "res\\icons\\", "bonus": [{ "item": "", "mult": 0 }] }],
"list2": [{"name": "", "active": true, "url": "res\\icons\\", "weight": 0, "base": 0 }]
```
When the list is shuffled, the code loads all items from the first list where 'active' is true into a generated loot table.  That table is sorted by the given weights for each item.

The 'weight' attribute is an arbitrary integer used to relate a given item to the rest of the items in the list.  The code adds all of the items' weights to set the maximum range for the Random() function.  After the selection, the item is then popped from the list and added to a selection list, which is displayed in the HTML page.

The 'bonus' attribute influences the weights of the second list; For a currently selected item from list 1, the items from list 2 with the matching name will be loaded into a generated loot table with a modified weight.  The 'base' attribute in list 2 is used to restore the modified weights after selection.  Once a selection is picked from the second loot table, is it added to a list that is paired with the first.

Image assets from Blade and Soul Gamepedia [https://bladeandsoul.gamepedia.com/] 
which uses CC BY-NC-SA 3.0 [https://creativecommons.org/licenses/by-nc-sa/3.0/]

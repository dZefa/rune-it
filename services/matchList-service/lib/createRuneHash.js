// Hashes runes to save space in database
const createRuneHash = (runes) => {
  let runeHash = new Array(8).fill(0);

  for (let key in runes) {
    if (key === 'primaryStyle') {
      runeHash[0] = runes[key];
    } else if (key === 'subStyle') {
      runeHash[1] = runes[key];
    } else if (key === 'perk0') {
      runeHash[2] = runes[key];
    } else if (key === 'perk1') {
      runeHash[3] = runes[key];
    } else if (key === 'perk2') {
      runeHash[4] = runes[key];
    } else if (key === 'perk3') {
      runeHash[5] = runes[key];
    } else if (key === 'perk4') {
      runeHash[6] = runes[key];
    } else if (key === 'perk5') {
      runeHash[7] = runes[key]
    }
  }

  return runeHash.join('');
}

module.exports = { createRuneHash };

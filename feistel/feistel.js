/** 
 * 
 * @title feistel.js
 * @author Steven McGough
 * @date 27.04.2021
 * 
 * UEBUNG_03
 * 
 */

let args = {
   encrypt: false,
   decrypt: false,
   test: false,
   help: false,
   config: {
      rounds: 4,
      blocksize: 6,
      blocksize_bits: 24,
      pc: [22, 19, 5, 15, 10, 6, 3, 21, 16, 9, 4, 20, 12, 23, 8, 1, 18, 13],
      shiftRules: [0, 4, 2, 4, 2],
      key: 0xC92B57,
      msg: 0xD3A0C7,
   },
   roundKey: {
      keyOne: 0x000000,
      keyTwo: 0x000000,
      keyThree: 0x000000,
      keyFour: 0x000000,
   }
};

// MAIN
const feistel = (args) => {
   if (args.test) {
      test();
   }
   if (args.encrypt) {
      console.log(encrypt());
   }
   if (args.decrypt) {
      console.log(decrypt());
   }
   if (args.help) {
      help();
   }
};

// ENCRYPT
const encrypt = () => {
   console.log('Encrypting the message 0x%s with the key 0x%s', decimalToHexString(args.config.msg), decimalToHexString(args.config.key));
   return decimalToHexString(0);
}

// DECRYPT
const decrypt = () => {
   console.log('Decrypting the message 0x%s with the key 0x%s', decimalToHexString(args.config.msg), decimalToHexString(args.config.key));
   return decimalToHexString(0);
}

// CALULATE ROUNDKEY
const calculateRoundkey = () => {
   return roundkey;
};

// CALCULATES CIRCULAR LEFT SHIFT
const shift = (numToShift, roundNumber) => {
      const sizeOfBits = 4 * args.config.blocksize / 2;
   let result = ((numToShift << (roundNumber)) | (numToShift >> (sizeOfBits - (roundNumber)))) & 0xFFF;
   return (result + getBit(numToShift, sizeOfBits) & 0xFFF);
};

// CONVERTS DEZIMAL TO STRING IN HEX FORM
const decimalToHexString = (number) => {
   if (number < 0) {
      number = 0xFFFFFFFF + number + 1;
   } else if (number === undefined) {
      number = 0xFFFFFFFF;
   }
   return number.toString(16).toUpperCase();
}

// GETS BIT FROM NUMBER 'N' AT POSITION 'BITINDEX' 
const getBit = (n, bitIndex) => {
   const bitMask = 1 << bitIndex;
   const result = n & bitMask;
   return result >>> bitIndex;
}

const setBit = (n, bitIndex) => {
   const bitMask = 1 << bitIndex;
   return n | bitMask;
}

const clearBit = (n, bitIndex) => {
   const bitMask = ~(1 << bitIndex);
   return n & bitMask;
}

// HELP METHOD
const help = () => {
   console.log("Welcome to feistel.js");
   console.log(" -> recived command: --help");
   console.log(" -> In the @test() you can set your custom prefrences");
}

// SET ARGS TO DEFAULT
const reset = () => {
   args = {
      encrypt: true,
      decrypt: true,
      test: true,
      help: true,
      config: {
         rounds: 4,
         blocksize: 6,
         blocksize_bits: 24,
         pc: [22, 19, 5, 15, 10, 6, 3, 21, 16, 9, 4, 20, 12, 23, 8, 1, 18, 13],
         shiftRules: [0, 4, 2, 4, 2],
         key: 0xC92B57,
         msg: 0xD3A0C7,
      },
      roundKey: {
         keyOne: 0x000000,
         keyTwo: 0x000000,
         keyThree: 0x000000,
         keyFour: 0x000000,
      }
   };
}

// TEST METHOD
const test = () => {
   const test_round = args.config.shiftRules[1];
      console.log(encrypt());
      console.log();
      console.log(decrypt());
      console.log();
      const shift_test = 0xC92; 
      // +0Bit: 1100 1001 0010 == 0xC92
      // +2Bit: 0010 0100 1011 == 0x24B
      // +4Bit: 1001 0010 1100 == 0x92C

      console.log("Testing:");
      const after_shift = shift(shift_test, test_round);
      console.log('Shifted 0x%s %d bits to the left:', decimalToHexString(shift_test), test_round);
      console.log('-> 0x%s', (shift_test.toString(16).toUpperCase()));
      console.log('-> 0x%s', after_shift.toString(16).toUpperCase())
      console.log('->', (shift_test.toString(2)));
      console.log('->', (after_shift.toString(2)));
      // console.log(test_round);
};

feistel(args);
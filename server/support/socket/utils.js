const generateRoomCode = () => {
  const LENGTH     = 5;
  const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let code = '';

  for (let i = 0; i <= LENGTH; i++) {
    code += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }

  return code;
};


export { generateRoomCode };
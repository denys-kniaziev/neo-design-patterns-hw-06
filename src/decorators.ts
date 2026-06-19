export function withTimestamp<This, Return>(
  originalMethod: (this: This, message: string) => Return,
  _context: ClassMethodDecoratorContext<
    This,
    (this: This, message: string) => Return
  >
): (this: This, message: string) => Return {
  return function (this: This, message: string): Return {
    const timestamp = formatTimestamp(new Date());

    return originalMethod.call(this, `[${timestamp}] ${message}`);
  };
}

export function uppercase<This, Return>(
  originalMethod: (this: This, message: string) => Return,
  _context: ClassMethodDecoratorContext<
    This,
    (this: This, message: string) => Return
  >
): (this: This, message: string) => Return {
  return function (this: This, message: string): Return {
    return originalMethod.call(this, message.toUpperCase());
  };
}

function formatTimestamp(date: Date): string {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

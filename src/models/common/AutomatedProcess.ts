export interface AutomatedProcess {
  code: AutomatedProcessCode;
  queue: Queue;
  text: string;
  delay: string;
  officeId: string;
  dateTime: string;
}

interface Queue {
  number: string;
  category: string;
}

enum AutomatedProcessCode {
  IMMEDIATE,
  DELAYED,
  ERROR,
}

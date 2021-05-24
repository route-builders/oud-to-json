export class InvalidFileTypeError implements Error {
  name = 'InvalidFileTypeError';
  message = 'cannot detect text encoding. please load text file.';
}

export class InvalidFileContentError implements Error {
  name = 'InvalidFileContentError';
  message = 'Invalid source is received. please check contents.';
}

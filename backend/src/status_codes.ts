export enum HttpStatus {
  /**
   * The request succeeded.
   */
  OK = 200,
  /**
   * The request succeeded and a new resource was created.
   */
  CREATED = 201,
  /**
   * The server cannot process the request due to malformed syntax.
   */
  BAD_REQUEST = 400,
  /**
   * The client does not have authorization to access a resource.
   */
  UNAUTHORIZED = 401,
  /**
   * The server understands the request, but refuses to handle it.
   */
  FORBIDDEN = 403,
  /**
   * The resource was not found.
   */
  NOT_FOUND = 404,
  /**
   * The client attempted to create a duplicate resource.
   */
  CONFLICT = 409,
  /**
   * The server failed unrecoverably.
   */
  INTERNAL_SERVER_ERROR = 500,
}

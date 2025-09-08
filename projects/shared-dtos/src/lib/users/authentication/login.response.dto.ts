import {MessageDto} from '../../common/message.dto';

/**
 * DTO que representa una respuesta al iniciar sesión
 */
export interface LoginResponseDto extends MessageDto {
  token: string;
  username: string;
}

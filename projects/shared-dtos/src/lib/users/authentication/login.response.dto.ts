import {MessageDto} from '../../common/message.dto';

export interface LoginResponseDto extends MessageDto {
  token: string;
  username: string;
}

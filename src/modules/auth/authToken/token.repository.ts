import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from 'src/lib/entities/accessToken.entity';
import { RefreshToken } from 'src/lib/entities/refreshToken.entity';
import { Repository } from 'typeorm';
import { SaveAccessTokenDto } from './dto/saveAccessToken.dto';
import { SaveRefreshTokenDto } from './dto/saveRefreshToken.dto';

export class TokenRepository {
  constructor(
    @InjectRepository(AccessToken)
    private readonly accessToken: Repository<AccessToken>,
    @InjectRepository(RefreshToken)
    private readonly refreshToken: Repository<RefreshToken>,
  ) {}

  async saveAccessTokenMetadata(accessTokeDto: SaveAccessTokenDto) {
    try {
      const newAccessToken = this.accessToken.create(accessTokeDto);
      return this.accessToken.save(newAccessToken);
    } catch (err) {
      throw err;
    }
  }

  async saveRefreshTokenMetadata(refreshTokeDto: SaveRefreshTokenDto) {
    try {
      const newAccessToken = this.accessToken.create(refreshTokeDto);
      return this.accessToken.save(newAccessToken);
    } catch (err) {
      throw err;
    }
  }

  async validatedRefreshToken(userId: string, refreshToken: string) {
    try {
      const res = await this.refreshToken
        .createQueryBuilder()
        .select('UserId')
        .where('UserId = :UserId', { userId })
        .andWhere('token = :token', { token: refreshToken })
        .andWhere('expireDate <= :currentDate', { currentDate: new Date() })
        .getRawOne();
      return res;
    } catch (err) {
        throw err;
    }
  }
}

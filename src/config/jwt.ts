import { JwtModule } from '@nestjs/jwt';
import {jwtConstants} from "../common/constants/jwt";

export default JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
});
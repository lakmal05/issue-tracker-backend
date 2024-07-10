import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CommonLoginDto } from "./dto/common-login.dto";
import { ContactNoLoginDto } from "./dto/contact-no-login.dto";
import { RoleNameEnum } from "src/common/enum/role.enum";
import { CustomerRegisterDto } from "./dto/customer-register.dto";
import { Prefixes } from "src/utils/prefixes";
import { CommonValidateOtpDto } from "./dto/common-validate-otp.dto";
import { ValidateMethodEnum } from "src/common/enum/validateMethod.enum";
import { UserTypeEnum } from "src/common/enum/userType.enum";
import { ResetPasswdDto } from "./dto/reset-passwd.dto";
import { UpdatePasswdDto } from "./dto/update-passwd.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * login with email and passowrd
   * @param roleName  route the funtion via role name CUSTOMER or ADMIN
   * @returns the token and permission if it admin and return the role and use details
   */

  @Post("auth/login/email/:userType")
  loginByEmail(
    @Param("userType") userType: string,
    @Body() data: CommonLoginDto
  ) {
    return this.authService.loginByEmail(userType, data);
  }

  @Get("auth/get-logged/:userType")
  async getUserByToken(
    @Req() req: any,
    @Param("userType") userType: UserTypeEnum
  ) {
    const token = req.headers?.authorization?.split("Bearer ")[1];
    return await this.authService.getLoggedUser(token, userType);
  }

  @Get("auth/get-new-token")
  async getNewTokenByRefreshToken(@Req() req) {
    const token = req.headers?.authorization?.split("Bearer ")[1];
    return await this.authService.getNewTokenByRefreshToken(token);
  }
}

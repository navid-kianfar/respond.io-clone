export interface IdentityProfileDto {
  timeZone: string;

}
export interface IdentityDto {
  token: string;
  userId: string;
}
export interface IdentitySigninDto extends IdentityDto{
}

import { Controller, Get, Render, Body, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LeaveRequestDto } from './LeaveRequest.dto';
import { response, Response } from 'express';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @Render('index')
  leave(
    @Body() LeaveRequestDto: LeaveRequestDto,
    @Res() response: Response
  ){
    let errors = [];

    if (!LeaveRequestDto.nev) {
      console.log(LeaveRequestDto.nev)
      errors.push("Meg kell adni a nevet!")
    }
    if (!LeaveRequestDto.kezdoDatum) {
      errors.push("Meg kell adni a kezdődátumot!");
    }
    if (!LeaveRequestDto.vegDatum) {
      errors.push("Meg kell adni a végdátumot!");
    }
    if (!LeaveRequestDto.alkalmazottAzon) {
      errors.push("Meg kell adni az alkalmazott azonosítóját!");
    }
    if (!LeaveRequestDto.indoklas) {
      errors.push("Meg kell adni az indoklást!");
    }
    const regex = /^[A-Z]{3}-[1-9]{3}$/;
    if (!regex.test(LeaveRequestDto.alkalmazottAzon)) {
      errors.push("Nem megfelelő az azonosító formtuma!")
    }
    if (typeof LeaveRequestDto.indoklas === 'string' && LeaveRequestDto.indoklas.length < 30) {
      errors.push("Az indoklás túl rövid!")
    }
    if (LeaveRequestDto.kezdoDatum && LeaveRequestDto.vegDatum && LeaveRequestDto.kezdoDatum > LeaveRequestDto.vegDatum) {
      errors.push("A kezdő dátumnak hamarabb kell lennie mint a vég dátumnak!")
    }
    
    if (errors.length > 0) {
      response.render('index', {errors: errors, data: LeaveRequestDto})
    }
    else{
      response.redirect('/success');
    }
  }

  @Get()
  @Render('index')
  megjelintes(){
    return {errors: [], data: {}}
  }

  @Get("success")
  LeaveRequestSuccess(){
    return "Sikeres művelet"
  }
}

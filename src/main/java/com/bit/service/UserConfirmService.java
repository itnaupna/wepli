package com.bit.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.bit.mapper.UserConfirmMapper;
import com.bit.util.SendSMS;

@Service
public class UserConfirmService {
    @Autowired
    UserConfirmMapper uMapper;

    @Autowired
    private JavaMailSender mailSender;

    private String BuildCode() {
        String code = String.valueOf(new Random().nextInt(900000) + 100000);
        return code;
    }

    public boolean RequestCode(int type, String key) {
        switch (type) {
            case 0:
                return CreateEmailVerifyCode(key);
            case 1:
                return CreatePhoneVerifyCode(key);
            default:
                return false;
        }
    }

    public boolean VerifyCode(int type, String key, String code) {
        switch (type) {
            case 0:
                return CheckEmailCode(key, code);
            case 1:
                return CheckPhoneCode(key, code);
            default:
                return false;
        }
    }

    private boolean CreateEmailVerifyCode(String email) {

        Map<String, String> data = new HashMap<>();
        data.put("email", email);
        String code = BuildCode();
        data.put("code", code);
        sendEmailCode(email, code);

        if (uMapper.selectIsAlreadyHasEmailCode(email) > 0) {
            return uMapper.updateEmailCode(data) > 0;
        } else {
            return uMapper.insertEmailCode(data) > 0;
        }
    }

    @Autowired
    SendSMS sms;

    private boolean CreatePhoneVerifyCode(String phone) {
        String code = BuildCode();
        String res = "";
        try {
            res = sms.Send(phone, code).getStatusCode();
        } catch (Exception e) {
            System.out.println("문자 발송 실패");
            return false;
        }
        System.out.println("res : " + res);

        if (!res.equals("202"))
            return false;
        // if (response.getStatusCode() != HttpStatus.ACCEPTED)
        // return false;

        Map<String, String> data = new HashMap<>();
        data.put("phone", phone);
        data.put("code", code);
        System.out.println(data);
        if (uMapper.selectIsAlreadyHasPhoneCode(phone) > 0) {
            System.out.println("인증코드 삭제후 재발급");
            if (uMapper.deletePhoneCode(phone) > 0)
                return uMapper.insertPhoneCode(data) > 0;
            else
                return false;
        } else {
            System.out.println("인증코드 발급");
            return uMapper.insertPhoneCode(data) > 0;
        }
    }

    private boolean CheckEmailCode(String email, String code) {
        Map<String, String> data = new HashMap<>();
        data.put("email", email);
        data.put("code", code);
        if (uMapper.selectVerifyEmail(data) > 0) {
            uMapper.deleteEmailCode(email);
            return uMapper.updateVerifyEmailConfirm(email) > 0;
        } else {
            return false;
        }
    }

    private boolean CheckPhoneCode(String phone, String code) {
        Map<String, String> data = new HashMap<>();
        data.put("phone", phone);
        data.put("code", code);
        if (uMapper.selectVerifyPhone(data) > 0) {
            uMapper.deletePhoneCode(phone);
            return uMapper.updateVerifyPhoneConfirm(phone) > 0;
        } else {
            return false;
        }
    }

    // 이메일 발송
    private void sendEmailCode(String email, String code) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper mmh = new MimeMessageHelper(mimeMessage, "UTF-8");
            mmh.setFrom("wepli@naver.com");
            mmh.setTo(email);
            mmh.setSubject("[Wepli] 이메일 인증번호");
            mmh.setText("<div style=\"display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: url(https://kr.object.ncloudstorage.com/wepli/Frame_.png); width: 800px; height: 750px; margin: 30px auto 0 auto;\">" 
            +"<div style=\"margin: 180px auto 0 auto;\">"
            +"<span style=\"font-size:39px; font-weight:bold;\">이메일 인증번호</span>"
            +"</div>"
            +"<div style=\"background-color:white; width:250px; height: 70px; line-height: 70px; margin: 30px auto 0 auto; text-align: center; border-radius: 15px; box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);\">"
            +"<span style=\"font-size:39px; font-weight:bold; color:#5DC1FE;\">"+ code +"</span>"
            +"</div>"
            +"<div style=\"margin: 50px auto 0 auto; background-color: #5DC1FE;border-radius: 15px;  padding: 20px;box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25); \">"
            + "<a href=\"http://localhost:3001\" style=\"text-decoration:none; color:black;\">"
            +"<span>wepli 바로가기</span>"
            +"</a>"
            +"</div>"
            +"</div>", true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("메일 발송");
        }
    }

}

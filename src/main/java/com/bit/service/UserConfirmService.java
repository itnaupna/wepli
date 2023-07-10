package com.bit.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.mapper.UserConfirmMapper;
import com.bit.util.SendSMS;

@Service
public class UserConfirmService {
    @Autowired
    UserConfirmMapper uMapper;

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
        data.put("code", BuildCode());
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

}

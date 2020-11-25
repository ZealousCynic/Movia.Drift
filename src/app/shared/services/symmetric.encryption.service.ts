import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js/crypto-js"

@Injectable({
    providedIn: 'root',
  })
  export class SymmetricEncryptionService {
        
    key = "counttosixteen16"

    constructor() {

        }

    Encrypt(value) {
        var _key = CryptoJS.enc.Utf8.parse(this.key);
        var iv = CryptoJS.enc.Utf8.parse(this.key);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), _key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return encrypted.toString();        
    }

    Decrypt(value) {
        var _key = CryptoJS.enc.Utf8.parse(this.key);
        var iv = CryptoJS.enc.Utf8.parse(this.key);
        var decrypted = CryptoJS.AES.decrypt(value, this.key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }
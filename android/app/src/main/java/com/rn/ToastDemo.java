package com.rn;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ToastDemo extends ReactContextBaseJavaModule {
    public ToastDemo(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public String getName() {
        return "Toast";
    }

    @ReactMethod
    public void getPackageName() {
        String name = getReactApplicationContext().getPackageName();
        Toast.makeText(getReactApplicationContext(),"Hello World!", Toast.LENGTH_LONG).show();
    }
}
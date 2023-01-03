# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }


-keep class com.reconnect.CloudSolidaire.prod.BuildConfig { *; }
-keep class com.reconnect.CloudSolidaire.preprod.BuildConfig { *; }
-keep class com.reconnect.CloudSolidaire.debug.BuildConfig { *; }
-keep class com.reconnect.CloudSolidaire.prod.generated.AppConstants { *; }
-keep class com.reconnect.CloudSolidaire.preprod.generated.AppConstants { *; }
-keep class com.reconnect.CloudSolidaire.debug.generated.AppConstants { *; }
-keepresources string/build_config_package

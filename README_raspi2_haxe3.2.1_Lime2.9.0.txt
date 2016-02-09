# how to install haxe, neko and lime on raspberry pi 2


# --------------------------------------------------
# -------------------------- Neko ------------------
# --------------------------------------------------

wget http://nekovm.org/media/neko-2.0.0.tar.gz
tar xvzf neko-2.0.0.tar.gz 
rm neko-2.0.0.tar.gz 

cd neko-2.0.0/
make
sudo make install

# todo: check path !





# --------------------------------------------------
# ------------------------- Haxe -------------------
# --------------------------------------------------

git clone https://github.com/HaxeFoundation/haxe.git  haxe-3.2.1 --recursive --branch 3.2.1 --single-branch
cd haxe-3.2.1/
make
sudo make install

# dont run haxelib into build-folder ;), so:
cd ..

# --------------------------------------------------
# (need sudo here?)
sudo haxelib selfupdate
sudo haxelib run lime setup



# --------------------------------------------------
# ------------------------- LIME -------------------
# --------------------------------------------------

git clone https://github.com/openfl/lime.git lime-2.9.0 --recursive --branch 2.9.0 --single-branch

cd lime-2.9.0/

vi project/Build.xml 
# -------------------------------------------------
# uncomment in line 354 <lib name="-lbcm_host" />
# and add               <lib name="-L/opt/vc/lib" />
# -------------------------------------------------

# find . -name 'rpi'
# more lime/project/lib/sdl/src/video/raspberry/SDL_rpimouse.c 

vi project/lib/sdl/include/configs/rpi/SDL_config.h 
# -------------------------------------------------
# uncomment line 83:
#     define HAVE_LIBUDEV_H 1

# comment and uncomment line 290:
#     /* #define SDL_VIDEO_DRIVER_X11 1 */
#     #define SDL_VIDEO_DRIVER_RPI 1
#     /* #define SDL_VIDEO_DRIVER_X11_DYNAMIC "/usr/lib/arm-linux-gnueabihf/libX11.so.6" */
#     /* #define SDL_VIDEO_DRIVER_X11_DYNAMIC_XEXT "/usr/lib/arm-linux-gnueabihf/libXext.so.6" */

# comment line 306:
#     /* #define SDL_VIDEO_DRIVER_X11_XSHAPE 1 */

# comment line 308:
#     /* #define SDL_VIDEO_DRIVER_X11_SUPPORTS_GENERIC_EVENTS 1 */

# comment line 311:
#     /* #define SDL_VIDEO_DRIVER_X11_HAS_XKBKEYCODETOKEYSYM 1 */


# --------------------------------------------------
cd ..
haxelib dev lime lime-2.9.0

# (need sudo here?)
sudo lime rebuild lime linux -rpi -v -clean

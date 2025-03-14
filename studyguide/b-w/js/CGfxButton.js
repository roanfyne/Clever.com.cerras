function CGfxButton(iXPos,iYPos,oSprite, oParentContainer){
    
    var _bDisabled;
    
    var _iScaleFactor;
    
    var _iListenerIDMouseDown;
    var _iListenerIDPressUp;
    var _iListenerIDMouseOver;
    var _iListenerIDMouseOut;
    
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oButton;
    var _oTween;
    var _oParent;
    
    this._init =function(iXPos,iYPos,oSprite, oParentContainer){
        _bDisabled = false;
        
        _iScaleFactor = 1;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        oParentContainer.addChild(_oButton);
        
        var oButton = createBitmap( oSprite);
        oButton.scaleX =   _oButton.scaleY = _iScaleFactor;                         
        oButton.regX = oSprite.width/2;
        oButton.regY = oSprite.height/2;
        _oButton.addChild(oButton);
                
        
        this._initListener();
    };
    
    this.unload = function(){
        if(s_bMobile){
            _oButton.off("mousedown", _iListenerIDMouseDown);
            _oButton.off("pressup" , _iListenerIDPressUp);
        } else {
            _oButton.off("mousedown", _iListenerIDMouseDown);
            _oButton.off("mouseover", _iListenerIDMouseOver);
            _oButton.off("mouseout", _iListenerIDMouseOut);
            _oButton.off("pressup" , _iListenerIDPressUp);
        }
        
       oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.setClickable = function(bVal){
        _bDisabled = !bVal;
    };
    
    this._initListener = function(){
        if(s_bMobile){
            _iListenerIDMouseDown   = _oButton.on("mousedown", this.buttonDown);
            _iListenerIDPressUp     = _oButton.on("pressup" , this.buttonRelease);
        } else {
            _iListenerIDMouseDown   = _oButton.on("mousedown", this.buttonDown);
            _iListenerIDMouseOver   = _oButton.on("mouseover", this.buttonOver);
            _iListenerIDMouseOut   = _oButton.on("mouseout", this.buttonOut);
            _iListenerIDPressUp     = _oButton.on("pressup" , this.buttonRelease);
        }      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisabled){
            return;
        }
        _oButton.scaleX = _iScaleFactor;
        _oButton.scaleY = _iScaleFactor;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisabled){
            return;
        }
        _oButton.scaleX = _iScaleFactor*0.9;
        _oButton.scaleY = _iScaleFactor*0.9;

        playSound("click",1,false);

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.buttonOver = function(evt){
        if(!s_bMobile){
            if(_bDisabled){
                return;
            }
            evt.target.cursor = "pointer";
        }  
    };
    
    this.buttonOut = function(evt){
        if(!s_bMobile){
            if(_bDisabled){
                return;
            }
            evt.target.cursor = "pointer";
            
            if(_aCbCompleted[ON_MOUSE_OUT]){
                _aCbCompleted[ON_MOUSE_OUT].call(_aCbOwner[ON_MOUSE_OUT]);
            }
        } 

    };
    
    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({scaleX: _iScaleFactor*0.9, scaleY: _iScaleFactor*0.9}, 850, createjs.Ease.quadOut).to({scaleX: _iScaleFactor, scaleY: _iScaleFactor}, 650, createjs.Ease.quadIn).call(function () {
            _oParent.pulseAnimation();
        });
    };

    this.trembleAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({rotation: 5}, 75, createjs.Ease.quadOut).to({rotation: -5}, 140, createjs.Ease.quadIn).to({rotation: 0}, 75, createjs.Ease.quadIn).wait(750).call(function () {
            _oParent.trebleAnimation();
        });
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this.setText = function(szText, iX, iY){
        var oText = new createjs.Text(szText, " 44px " + SECONDARY_FONT, "#1ef400");
        oText.textAlign = "center";
        oText.textBaseline = "middle";
        oText.x = iX;
        oText.y = iY;
        _oButton.addChild(oText);
    };

    _oParent = this;
    this._init(iXPos,iYPos,oSprite, oParentContainer);
    
    return this;
}
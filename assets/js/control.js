function Control(material){
    this.cameraX = 0;
    this.cameraY = 0;
    this.cameraZ = 5;
    this.transparent = material.transparent;
    this.transparentOptions = {
        opacity: material.opacity,
    };
    this.alphaTest = material.alphaTest;
    this.blending = material.blending;
    this.blendingOptions = {
        blendDst: THREE.OneMinusSrcAlphaFactor,
        blendDstAlpha: 0,
        blendEquation: THREE.AddEquation,
        blendEquationAlpha: 0,
        blendSrc: THREE.SrcAlphaFactor,
        blendSrcAlpha: 0,
    };
    this.clipIntersection = material.clipIntersection;
    this.clipShadows = material.clipShadows;
    this.colorWrite = material.colorWrite;
    this.depthFunc = material.depthFunc;
    this.depthWrite = material.depthWrite;
    this.stencilWrite = material.stencilWrite;
    this.stencilWriteMask = material.stencilWriteMask;
    this.stencilFunc = material.stencilFunc;
    this.stencilRef = material.stencilRef;
    this.stencilFuncMask = material.stencilFuncMask;
    this.stencilFail = material.stencilFail;
    this.stencilZFail = material.stencilZFail;
    this.stencilZPass = material.stencilZPass;
    this.flatShading = material.flatShading;
    this.fog = material.fog;
    this.polygonOffset = material.polygonOffset;
    this.polygonOffsetOptions = {
        polygonOffsetFactor: material.polygonOffsetFactor,
        polygonOffsetUnits: material.polygonOffsetUnits,
    };
    this.premultipliedAlpha = material.premultipliedAlpha;
    this.dithering = material.dithering;
    this.shadowSide = material.shadowSide;
    this.side = material.side;
    this.toneMapped = material.toneMapped;
    this.vertexColors = material.vertexColors;
    this.visible = material.visible;

    this.newGui = () => {
        let gui = new dat.GUI();
        gui.add(this, 'cameraX', -5.0, 5.0).listen();
        gui.add(this, 'cameraY', -5.0, 5.0).listen();
        gui.add(this, 'cameraZ', 0, 10.0).listen();

        let material = gui.addFolder('material');
        material.add(this, 'transparent').onChange((value) => {
            if(value){
                transparentOptionsFolderContext.show();
                transparentOptionsFolderContext.open();
            }else{
                transparentOptionsFolderContext.hide();
                transparentOptionsFolderContext.close();
            }
        }).listen();
        let transparentOptionsFolderContext = material.addFolder('Opacity');
        transparentOptionsFolderContext.add(this.transparentOptions, 'opacity',  0.0,  1.0,  0.01).listen();
        transparentOptionsFolderContext.close();
        transparentOptionsFolderContext.hide();
        material.add(this, 'blending', {
            NormalBlending      :THREE.NormalBlending,
            NoBlending          :THREE.NoBlending,
            AdditiveBlending    :THREE.AdditiveBlending,
            SubstractiveBlending:THREE.SubtractiveBlending,
            MultiplyBlending    :THREE.MultiplyBlending,
            CustomBlending      :THREE.CustomBlending,
        }).onChange((value) => {
            if(value == THREE.CustomBlending){
            customBlendingOptionsFolderContext.show();
            customBlendingOptionsFolderContext.open();
            } else {
                customBlendingOptionsFolderContext.hide();
                customBlendingOptionsFolderContext.close();
            }
        }).listen();
        let customBlendingOptionsFolderContext = material.addFolder('Blending Options');
        customBlendingOptionsFolderContext.add(this.blendingOptions, 'blendDst', {
            Zero                :THREE.ZeroFactor, 
            One                 :THREE.OneFactor, 
            SrcColor            :THREE.SrcColorFactor,
            OneMinusSrcColor    :THREE.OneMinusSrcColorFactor,
            SrcAlpha            :THREE.SrcAlphaFactor,
            OneMinusSrcAlpha    :THREE.OneMinusSrcAlphaFactor,
            OneMinusDstAlpha    :THREE.DstAlphaFactor,
            OneMinusDstAlpha    :THREE.OneMinusDstAlphaFactor,
            DstColor            :THREE.DstColorFactor,
            OneMinusDstColor    :THREE.OneMinusDstColorFactor
        }).listen();
        customBlendingOptionsFolderContext.add(this.blendingOptions, 'blendDstAlpha', -10,10).listen();
        customBlendingOptionsFolderContext.add(this.blendingOptions, 'blendEquation', {
            Add                 :THREE.AddEquation, 
            Substract           :THREE.SubtractEquation, 
            ReverseSubstract    :THREE.ReverseSubtractEquation, 
            Min                 :THREE.MinEquation,
            Max                 :THREE.MaxEquation
        }).listen();
        customBlendingOptionsFolderContext.add(this.blendingOptions,'blendEquationAlpha',-10,10).listen();
        customBlendingOptionsFolderContext.add(this.blendingOptions,'blendSrc',{
            Zero                :THREE.ZeroFactor, 
            One                 :THREE.OneFactor, 
            SrcColor            :THREE.SrcColorFactor,
            OneMinusSrcColor    :THREE.OneMinusSrcColorFactor,
            SrcAlpha            :THREE.SrcAlphaFactor,
            OneMinusSrcAlpha    :THREE.OneMinusSrcAlphaFactor,
            OneMinusDstAlpha    :THREE.DstAlphaFactor,
            OneMinusDstAlpha    :THREE.OneMinusDstAlphaFactor,
            DstColor            :THREE.DstColorFactor,
            OneMinusDstColor    :THREE.OneMinusDstColorFactor,
            SrcAlphaSaturate    :THREE.SrcAlphaSaturateFactor
        }).listen();
        customBlendingOptionsFolderContext.add(this.blendingOptions, 'blendSrcAlpha', -10, 10).listen();
        customBlendingOptionsFolderContext.hide();
        customBlendingOptionsFolderContext.close();
        material.add(this, 'alphaTest', 0.0, 1.0, 0.01).listen();
        material.add(this, 'clipIntersection').listen();
        material.add(this, 'clipShadows').listen();
        material.add(this, 'colorWrite').listen();
        material.add(this, 'depthFunc', {
            LessEqual               :THREE.LessEqualDepth,
            Never                   :THREE.NeverDepth,
            Always                  :THREE.AlwaysDepth,
            Less                    :THREE.LessDepth,
            GreaterEqual            :THREE.GreaterEqualDepth,
            Greater                 :THREE.GreaterDepth,
            NotEqual                :THREE.NotEqualDepth
        }).listen();
        material.add(this, 'depthWrite').listen();
        material.add(this, 'stencilWrite').listen();
        material.add(this, 'stencilWriteMask', 255, 255).listen();
        material.add(this, 'stencilFunc',{
            Always                  :THREE.AlwaysStencilFunc,
            Never                   :THREE.NeverStencilFunc,
            Less                    :THREE.LessStencilFunc,
            Equal                   :THREE.EqualStencilFunc,
            LessEqual               :THREE.LessEqualStencilFunc,
            Greater                 :THREE.GreaterStencilFunc,
            NotEqual                :THREE.NotEqualStencilFunc,
            GreaterEqual            :THREE.GreaterEqualStencilFunc
        }).listen();
        material.add(this, 'stencilRef').listen();
        material.add(this, 'stencilFuncMask', 255, 255).listen();
        material.add(this, 'stencilFail',{
            Keep                    :THREE.KeepStencilOp,
            Zero                    :THREE.ZeroStencilOp,
            Replace                 :THREE.ReplaceStencilOp,
            Increment               :THREE.IncrementStencilOp,
            Decrement               :THREE.DecrementStencilOp,
            IncrementWrap           :THREE.IncrementWrapStencilOp,
            DecrementWrap           :THREE.DecrementWrapStencilOp,
            Invert                  :THREE.InvertStencilOp
        }).listen();
        material.add(this, 'stencilZFail',{
            Keep                    :THREE.KeepStencilOp,
            Zero                    :THREE.ZeroStencilOp,
            Replace                 :THREE.ReplaceStencilOp,
            Increment               :THREE.IncrementStencilOp,
            Decrement               :THREE.DecrementStencilOp,
            IncrementWrap           :THREE.IncrementWrapStencilOp,
            DecrementWrap           :THREE.DecrementWrapStencilOp,
            Invert                  :THREE.InvertStencilOp
        }).listen();
        material.add(this, 'stencilZPass',{
            Keep                    :THREE.KeepStencilOp,
            Zero                    :THREE.ZeroStencilOp,
            Replace                 :THREE.ReplaceStencilOp,
            Increment               :THREE.IncrementStencilOp,
            Decrement               :THREE.DecrementStencilOp,
            IncrementWrap           :THREE.IncrementWrapStencilOp,
            DecrementWrap           :THREE.DecrementWrapStencilOp,
            Invert                  :THREE.InvertStencilOp
        }).listen();
        material.add(this, 'flatShading').listen();
        material.add(this, 'fog').listen();
        material.add(this, 'polygonOffset').onChange((value) => {
            if(value){
                polygonOffsetOptionsFolderContext.show();
                polygonOffsetOptionsFolderContext.open();
            }else{
                polygonOffsetOptionsFolderContext.hide();
                polygonOffsetOptionsFolderContext.close();
            }
        }).listen();
        let polygonOffsetOptionsFolderContext = material.addFolder('Polygon Offset Options');
        polygonOffsetOptionsFolderContext.add(this.polygonOffsetOptions, 'polygonOffsetFactor', -10, 10).listen();
        polygonOffsetOptionsFolderContext.add(this.polygonOffsetOptions, 'polygonOffsetUnits', -10, 10).listen();
        polygonOffsetOptionsFolderContext.hide();
        polygonOffsetOptionsFolderContext.close();
        material.add(this, 'premultipliedAlpha').listen();
        material.add(this, 'dithering').listen();
        material.add(this, 'shadowSide', {
            Null                    :null,
            Front                   :THREE.FrontSide,
            Back                    :THREE.BackSide,
            Double                  :THREE.DoubleSide
        }).listen();
        material.add(this,'side',{
            Front                   :THREE.FrontSide,
            Back                    :THREE.BackSide,
            Double                  :THREE.DoubleSide
        }).listen();
        material.add(this,'toneMapped').listen();
        material.add(this,'vertexColors').listen();
        material.add(this,'visible').listen();
        
        return gui;
    }

    this.setMaterialToThis = (material) => {
        material.transparent = this.transparent;
        material.opacity = this.transparentOptions.opacity;
        material.alphaTest = this.alphaTest;
        material.blending = this.blending;
        material.blendDst = this.blendingOptions.blendDst;
        material.blendDstAlpha = this.blendingOptions.blendDstAlpha;
        material.blendEquation = this.blendingOptions.blendEquation;
        material.blendEquationAlpha = this.blendingOptions.blendEquationAlpha;
        material.blendSrc = this.blendingOptions.blendSrc;
        material.blendSrcAlpha = this.blendingOptions.blendSrcAlpha;
        material.clipIntersection = this.clipIntersection;
        material.clipShadows = this.clipShadows;
        material.colorWrite = this.colorWrite;
        material.depthFunc = this.depthFunc;
        material.depthWrite = this.depthWrite;
        material.stencilWrite = this.stencilWrite;
        material.stencilWriteMask = this.stencilWriteMask;
        material.stencilFunc = this.stencilFunc;
        material.stencilRef = this.stencilRef;
        material.stencilFuncMask = this.stencilFuncMask;
        material.stencilFail = this.stencilFail;
        material.stencilZFail = this.stencilZFail;
        material.stencilZPass = this.stencilZPass;
        material.flatShading = this.flatShading;
        material.fog = this.fog;
        material.polygonOffset = this.polygonOffset;
        material.polygonOffsetFactor = this.polygonOffsetOptions.polygonOffsetFactor;
        material.polygonOffsetUnits = this.polygonOffsetOptions.polygonOffsetUnits;
        material.premultipliedAlpha = this.premultipliedAlpha;
        material.dithering = this.dithering;
        material.shadowSide = this.shadowSide;
        material.side = this.side;
        material.toneMapped = this.toneMapped;
        material.vertexColors = this.vertexColors;
        material.visible = this.visible;
    }
}
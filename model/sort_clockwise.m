
  function [x,y] = sort_clockwise(X,Y) 
    adArrayX = zeros(2,1);
    adArrayY = zeros(2,1);
    
    bcArrayX = zeros(2,1);
    bcArrayY = zeros(2,1);
    
    
    tempX = X;
    tempY = Y;
    
    [minX1,indexMinX1] = min(tempX);
    adArrayX(1) = tempX(indexMinX1);
    adArrayY(1) = tempY(indexMinX1);
    
    tempX(indexMinX1)  = Inf;
 
    [minX2,indexMinX2] = min(tempX);
    adArrayX(2) = tempX(indexMinX2);
    adArrayY(2) = tempY(indexMinX2);
    
    if adArrayY(2)<adArrayY(1)
        aX = adArrayX(2);
        aY = adArrayY(2);
        dX = adArrayX(1);
        dY = adArrayY(1);
    else
        aX = adArrayX(1);
        aY = adArrayY(1);
        dX = adArrayX(2);
        dY = adArrayY(2);

    end
    
    tempX = X;
    tempY = Y;
    
    [maxX1,indexMaxX1] = max(tempX);
    bcArrayX(1) = tempX(indexMaxX1);
    bcArrayY(1) = tempY(indexMaxX1);
    
    tempX(indexMaxX1)  = -Inf;
 
    [maxX2,indexMaxX2] = max(tempX);
    bcArrayX(2) = tempX(indexMaxX2);
    bcArrayY(2) = tempY(indexMaxX2);
    
    if bcArrayY(2)<bcArrayY(1)
        bX = bcArrayX(2);
        bY = bcArrayY(2);
        cX = bcArrayX(1);
        cY = bcArrayY(1);    
    else
        bX = bcArrayX(1);
        bY = bcArrayY(1);
        cX = bcArrayX(2);
        cY = bcArrayY(2);
    end
    x = [aX,bX,cX,dX];
    y = [aY,bY,cY,dY];
  end
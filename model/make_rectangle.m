%% three benifits of applying this operation to the images
%%  1.) the selected image gets smaller (less pixel = less time to process
%%  2.) easier to select tactical symbols (since they are located at the borders)
%%  3.) counteract to distortions (regarding perspective, watch transform.xlsx for more details) 

function [output_image, margin_left, margin_top] = make_rectangle( input_image, X, Y )
    
    factor = 50;
    
    tempX = X;
    tempY = Y;
    [minX1,indexMinX1] = min(tempX);
    tempX(indexMinX1)  = Inf;
    [minX2,indexMinX2] = min(tempX);
    
    tempX = X;
    
    [maxX1, indexMaxX1] = max(tempX);
    tempX(indexMaxX1)  = -Inf;
    [maxX2,indexMaxX2] = max(tempX);
    
    tempX = X;
   
    
    [minY1,indexMinY1] = min(tempY);
    tempY(indexMinY1)  = Inf;
    [minY2,indexMinY2] = min(tempY);
    
    tempY = Y;
    
    [maxY1,indexMaxY1] = max(tempY);
    tempY(indexMaxY1)  = -Inf;
    [maxY2,indexMaxY2] = max(tempY);    
    
    tempY = Y;
    
    width = maxX1 - minX1;
    height = maxY1 - minY1;

    margin_left = round(width / factor);
    margin_top = round(height / factor);
    
    width2 = width + 2 * margin_left;
    height2 = height + 2 * margin_top;
    
    if ispolycw(X, Y)
       [tempX, tempY] = poly2cw(X, Y);
    end
%  if ~ispolycw(ix, why)
%        fprintf('Corner selection was not clockwise or anti-clockwise. Therefore the values need to be sorted.\n');
%        [X2, Y2] = poly2cw(ix, why);
%        tempX = X2;
%        tempY = Y2;
%     end
    
   
    tempX(indexMinX1) = minX1 - margin_left;
    tempX(indexMinX2) = minX2 - margin_left;    
    tempX(indexMaxX1) = maxX1 + margin_left;
    tempX(indexMaxX2) = maxX2 + margin_left;
    
    tempY(indexMinY1) = minY1 - margin_top;
    tempY(indexMinY2) = minY2 - margin_top;
    tempY(indexMaxY1) = maxY1 + margin_top;
    tempY(indexMaxY2) = maxY2 + margin_top;
    
    
    [final_X, final_Y] = sortPolyFromClockwiseStartingFromTopLeft( tempX, tempY );

    x = [1; width2; width2; 1];
    y = [1; 1; height2; height2];

    A = zeros(8, 8);
    A(1, :) = [final_X(1), final_Y(1), 1, 0, 0, 0, -1 * final_X(1) * x(1), -1 * final_Y(1) * x(1)];
    A(2, :) = [0, 0, 0, final_X(1), final_Y(1), 1, -1 * final_X(1) * y(1), -1 * final_Y(1) * y(1)];
    A(3, :) = [final_X(2), final_Y(2), 1, 0, 0, 0, -1 * final_X(2) * x(2), -1 * final_Y(2) * x(2)];
    A(4, :) = [0, 0, 0, final_X(2), final_Y(2), 1, -1 * final_X(2) * y(2), -1 * final_Y(2) * y(2)];
    A(5, :) = [final_X(3), final_Y(3), 1, 0, 0, 0, -1 * final_X(3) * x(3), -1 * final_Y(3) * x(3)];
    A(6, :) = [0, 0, 0, final_X(3), final_Y(3), 1, -1 * final_X(3) * y(3), -1 * final_Y(3) * y(3)];
    A(7, :) = [final_X(4), final_Y(4), 1, 0, 0, 0, -1 * final_X(4) * x(4), -1 * final_Y(4) * x(4)];
    A(8, :) = [0, 0, 0, final_X(4), final_Y(4), 1, -1 * final_X(4) * y(4), -1 * final_Y(4) * y(4)];

    v = [x(1); y(1); x(2); y(2); x(3); y(3); x(4); y(4)];

    u = A \ v;

    U = reshape([u; 1], 3, 3)';

    w = U * [final_X'; final_Y'; ones(1, 4)];
    w = w ./ (ones(3, 1) * w(3, :));

    T = maketform('projective', U');
    
    output_image = imtransform(input_image, T, 'XData', [1 width2], 'YData',[1 height2]);
    
end


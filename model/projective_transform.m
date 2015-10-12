function [output_image, margin_left, margin_top] = projective_transform( input_image, X, Y )
    
    
    width  = max(X) - min(X);
	height = max(Y) - min(Y);

	Ax = 1;
	Bx = width;
	Cx = width;
	Dx = 1;

	Ay = 1;
	By = 1;
	Cy = height;
	Dy = height;
  
    
    [X, Y] = sort_clockwise( X, Y );
    
    

    M = zeros(8, 8);
	M(1, :) = [X(1), Y(1), 1, 0   , 0   , 0, -1 * X(1) * Ax, -1 * Y(1) * Ax];
	M(2, :) = [0   , 0   , 0, X(1), Y(1), 1, -1 * X(1) * Ay, -1 * Y(1) * Ay];
	M(3, :) = [X(2), Y(2), 1, 0   , 0   , 0, -1 * X(2) * Bx, -1 * Y(2) * Bx];
	M(4, :) = [0   , 0   , 0, X(2), Y(2), 1, -1 * X(2) * By, -1 * Y(2) * By];
	M(5, :) = [X(3), Y(3), 1, 0   , 0   , 0, -1 * X(3) * Cx, -1 * Y(3) * Cx];
	M(6, :) = [0   , 0   , 0, X(3), Y(3), 1, -1 * X(3) * Cy, -1 * Y(3) * Cy];
	M(7, :) = [X(4), Y(4), 1, 0   , 0   , 0, -1 * X(4) * Dx, -1 * Y(4) * Dx];
	M(8, :) = [0   , 0   , 0, X(4), Y(4), 1, -1 * X(4) * Dy, -1 * Y(4) * Dy];

    
    

    
    r = [Ax; Ay; Bx; By; Cx;  Cy; Dx; Dy];
        
 
  
    u = M \ r;
   
    U = reshape([u; 1], 3, 3)';
    
    TForm = maketform('projective', U');
    
	factor = 50;
	margin_left = round(width / factor);
    margin_top = round(height / factor);
	
    output_image = imtransform(input_image, TForm, 'XData', ...
        [-1*margin_left, width+margin_left], 'YData',[-1*margin_top, height+margin_top]);
    
end

